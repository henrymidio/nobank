function User() {

	/*
		Construtor
	*/
	var portfolio = [
		{
			'empresa': 'Starbucks',
			'simbolo': 'SBUX',
			'quantidade': 3
		},
		{
			'empresa': 'Tesla',
			'simbolo': 'TSLA',
			'quantidade': 2
		},
		{
			'empresa': 'Facebook',
			'simbolo': 'FB',
			'quantidade': 12
		},
		{
			'empresa': 'Apple',
			'simbolo': 'AAPL',
			'quantidade': 9
		},
		{
			'empresa': 'Alphabet Inc.',
			'simbolo': 'GOOGL',
			'quantidade': 1
		},
		{
			'empresa': 'Staples',
			'simbolo': 'SPLS',
			'quantidade': 100
		}
	]
	localStorage.setItem("portfolioStocks", JSON.stringify(portfolio));

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

	this.getCapitalInvestido = function() {
	}

	this.getCapitaldisponivel = function() {
		localStorage.getItem("capitalDisponivel")
	}
	this.setCapitalDisponivel = function() {
	}

	function getVarColor(sinal) {
    	  var c = sinal.charAt(0);
    	  if(c == "-") {
    	  	return "red";
    	  } else {
    	  	return "blue";
        }
	}

	this.getPortfolioPrices = function() {
		var portfolio = JSON.parse(localStorage.getItem("portfolioStocks"));
		if(!$.trim($("#tabela-valores tbody").html())=='') {
			return false;
		}
		$('#tabela-valores tbody').empty();
		for (var index in portfolio) {
			var line = "<tr class="+portfolio[index]['simbolo']+">"
	          + "<td><b>"+portfolio[index]['simbolo']+"</b><br><span class='ativo-nome'>"+portfolio[index]['empresa']+"</span></td>"
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
        	  var color = getVarColor(variacao);
        	  
        	  $('#tabela-valores tbody tr.'+simbolo+' .acao-var').html(variacao).addClass("color-"+color);
        	  $('#tabela-valores tbody tr.'+simbolo+' .acao-preco').html(parseFloat(preco).toFixed(2)).addClass('stock-box-'+color);
        	  console.log(status);
        	})
		}		
	}

	this.getPortfolioAmount = function() {
		var portfolio = JSON.parse(localStorage.getItem("portfolioStocks"));
		
		for (var index in portfolio) {
			var line = "<tr class="+portfolio[index]['simbolo']+">"
	          + "<td><span class='bold'>"+portfolio[index]['simbolo']+"</span><br><span class='ativo-nome'>"+portfolio[index]['quantidade']+" AÇÕES</span></td>"
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
        	  var variacao = result['Realtime Global Securities Quote']['09. Price Change Percentage'];
        	  

        	  //Verificação da cor das variações
        	  var color = getVarColor(variacao);

        	  $('#tabela-montante tbody tr.'+simbolo+' .acao-var').html(variacao).addClass("color-"+color);
        	  $('#tabela-montante tbody tr.'+simbolo+' .acao-preco').html(montante.toFixed(2)).addClass('stock-box-'+color);
        	   
        	})
		}		
	}

	this.setPortfolio = function() {
	}

	this.buyStock = function(qnt, cod) {

	}
	this.sellStock = function(qnt, cod) {
		
	}
}