function User() {

	/*
		Construtor
	
	var portfolio = [
		{
			'empresa': 'Starbucks',
			'simbolo': 'SBUX',
			'quantidade': 2,
			'pago': 57.60
		},
		{
			'empresa': 'Tesla',
			'simbolo': 'TSLA',
			'quantidade': 2,
			'pago': 308.00
		},
		{
			'empresa': 'Facebook',
			'simbolo': 'FB',
			'quantidade': 2,
			'pago': 148.00
		},
		{
			'empresa': 'Apple',
			'simbolo': 'AAPL',
			'quantidade': 2,
			'pago': 142.50
		},
		{
			'empresa': 'Alphabet Inc.',
			'simbolo': 'GOOGL',
			'quantidade': 2,
			'pago': 930.98
		}
	]

*/

	this.getName = function() {
		localStorage.getItem("name")
	}
	this.setName = function() {
	}

	this.getEmail = function() {
		localStorage.getItem("email")
	}
	this.setEmail = function() {
	}

	this.getCapitalInicial = function() {
		var portfolio = usuario.getPortfolio();
		if(portfolio.length < 1) {
			return 0;
		}
		var capitalInicial = 0;
		for (var index in portfolio) {
			capitalInicial = capitalInicial + (portfolio[index]['pago'] * 2);
		}
		return capitalInicial;
	}

	this.getCapitalInvestido = function() {
		var capitalInvestido = localStorage.getItem("capitalInvestido") ? localStorage.getItem("capitalInvestido") : 0;
		return capitalInvestido;
	}
	this.setCapitalInvestido = function(novoCapitalInvestido) {
		localStorage.setItem("capitalInvestido", novoCapitalInvestido);
	}

	this.getCapitalDisponivel = function() {
		var capitalDisponivel = localStorage.getItem("capitalDisponivel") ? localStorage.getItem("capitalDisponivel") : 10000;
		return capitalDisponivel;
	}
	this.setCapitalDisponivel = function(novoCapitalDisponivel) {
		localStorage.setItem("capitalDisponivel", novoCapitalDisponivel);
	}

	
	this.renderPortfolioPrices = function() {
		var portfolio = JSON.parse(localStorage.getItem("portfolioStocks"));
		if(!$.trim($("#tabela-valores tbody").html())=='') {
			return false;
		}
		$('#tabela-valores tbody').empty();
		for (var index in portfolio) {
			var line = "<tr class='stock-ticker "+portfolio[index]['simbolo']+"'>"
	          + "<td><b><span class='stock-symbol'>"+portfolio[index]['simbolo']+"</span></b><br><span class='ativo-nome'>"+portfolio[index]['empresa']+"</span></td>"
	          + "<td><span class='acao-var'>...</span></td>"
	          + "<td class='numeric-cell'><span class='acao-preco'>00.00</span></td>"
	          + "</tr>";
	    	$('#tabela-valores tbody').append(line);
	    }
		for (var index in portfolio) {

        	$.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+portfolio[index]['simbolo']+"&apikey=VFAVA1B9R16KT761", function success(result, status) {
        	  var preco = result['Realtime Global Securities Quote']['03. Latest Price'];
        	  var variacao = result['Realtime Global Securities Quote']['09. Price Change Percentage'];
        	  var simbolo = result['Realtime Global Securities Quote']['01. Symbol'];

        	  //Verificação da cor das variações
        	  var color = getPerColor(variacao);
        	  
        	  $('#tabela-valores tbody tr.'+simbolo+' .acao-var').html(variacao).addClass("color-"+color);
        	  $('#tabela-valores tbody tr.'+simbolo+' .acao-preco').html(parseFloat(preco).toFixed(2)).addClass('stock-box-'+color);
        	  //console.log(status);
        	})
		}	

		$('.stock-ticker').on('click', function(){
		    var ticker = $(this).find(".stock-symbol").text();
		    localStorage.setItem("ticker", ticker);
		    mainView.router.loadPage('ativo.html');
		 });
	}

	this.renderPortfolioAmount = function() {
		var portfolio = JSON.parse(localStorage.getItem("portfolioStocks"));
		var capitalInvestido = 0;
		
		for (var index in portfolio) {
			var line = "<tr class='stock-ticker "+portfolio[index]['simbolo']+"'>"
	          + "<td><b><span class='stock-symbol'>"+portfolio[index]['simbolo']+"</span></b><br><span class='ativo-nome'>"+portfolio[index]['quantidade']+" AÇÕES</span></td>"
	          + "<td><span class='acao-var'>...</span></td>"
	          + "<td class='numeric-cell'><span class='acao-preco'>00.00</span></td>"
	          + "</tr>";
	    	$('#tabela-montante tbody').append(line);
	    }
		for (var index in portfolio) {

        	$.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+portfolio[index]['simbolo']+"&apikey=VFAVA1B9R16KT761", function success(result, status) {
        	  var simbolo = result['Realtime Global Securities Quote']['01. Symbol'];
        	  var preco = result['Realtime Global Securities Quote']['03. Latest Price'];
        	  var indexP = portfolio.map(function(o) { return o.simbolo; }).indexOf(simbolo);
        	  var montante = (parseFloat(preco) * parseInt(portfolio[indexP]['quantidade']));
        	  var variacao = montante - (parseFloat(portfolio[indexP]['pago']) * parseInt(portfolio[indexP]['quantidade']));

        	  //Já aproveita e calcula o capital investido
        	  capitalInvestido = capitalInvestido + montante;
        	  animateNumbers(capitalInvestido, $('.current-money'));
        	  localStorage.setItem("capitalInvestido", capitalInvestido);

        	  $('#menu-disponivel').text(usuario.getCapitalDisponivel());

        	  //Verificação da cor das variações
        	  variacao = variacao.toFixed(2);
        	  var color = getPerColor(variacao.toString());

        	  $('#tabela-montante tbody tr.'+simbolo+' .acao-var').html('$'+variacao).addClass("color-"+color);
        	  $('#tabela-montante tbody tr.'+simbolo+' .acao-preco').html(montante.toFixed(2)).addClass('stock-box-'+color);
        	   
        	})
		}	
			
		$('.stock-ticker').on('click', function(){
		    var ticker = $(this).find(".stock-symbol").text();
		    localStorage.setItem("ticker", ticker);
		    mainView.router.loadPage('ativo.html');
		 });

	}

	this.getPortfolio = function() {
		var pt = localStorage.getItem("portfolioStocks") ? JSON.parse(localStorage.getItem("portfolioStocks")) : [];
		return pt;
	}
	this.setPortfolio = function(novoPortfolio) {
		localStorage.setItem("portfolioStocks", JSON.stringify(novoPortfolio));
	}

	this.buyStock = function(stock) {
		var cDisponivel = usuario.getCapitalDisponivel();
		var novoC = cDisponivel - (stock.pago * stock.quantidade);
		usuario.setCapitalDisponivel(novoC - 10);

		var portfolio = usuario.getPortfolio();
		portfolio.push(stock);
		usuario.setPortfolio(portfolio);

		usuario.setCapitalInvestido((parseFloat(stock.pago) * stock.quantidade) + parseFloat(usuario.getCapitalInvestido()));

	}
	this.sellStock = function(qnt, ticker) {
		
	}

	this.hasStock = function(ticker) {
		try {
			var portfolio = usuario.getPortfolio();
			var retorno = false;
			for (var index in portfolio) {
				if(portfolio[index]['simbolo'] == ticker) {
					return true;
				}	
			}
			return retorno;
		} catch(e) {
			return false;
		}
		
	}
}