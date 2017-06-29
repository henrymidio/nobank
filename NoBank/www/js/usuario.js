function User() {

	/*
		Construtor
	*/
	var portfolio = [
		{
			'empresa': 'Starbucks',
			'simbolo': 'SBUX',
			'quantidade': 1
		},
		{
			'empresa': 'Tesla',
			'simbolo': 'TSLA',
			'quantidade': 1
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
		var count = 0;
		for (var index in portfolio) {
			var line = "<tr>"
	          + "<td><b>"+portfolio[index]['simbolo']+"</b><br><span class='ativo-nome'>"+portfolio[index]['empresa']+"</span></td>"
	          + "<td><span class='acao-var'>-//-</span></td>"
	          + "<td class='numeric-cell'><span class='acao-preco'>00.00</span></td>"
	          + "</tr>";
	    	$('#tabela-valores tbody').append(line);

        	$.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+portfolio[index]['simbolo']+"&apikey=VFAVA1B9R16KT761", function success(result) {
        	  var preco = result['Realtime Global Securities Quote']['03. Latest Price'];
        	  var variacao = result['Realtime Global Securities Quote']['09. Price Change Percentage'];

        	  //Verificação da cor das variações
        	  var color = getVarColor(variacao);
        	  
        	  $('#tabela-valores tbody tr:eq('+count+') .acao-var').html(variacao);
        	  $('#tabela-valores tbody tr:eq('+count+') .acao-var').addClass("color-"+color);
        	  $('#tabela-valores tbody tr:eq('+count+') .acao-preco').html(parseFloat(preco).toFixed(2));
        	  $('#tabela-valores tbody tr:eq('+count+') .acao-preco').addClass('stock-box-'+color)
        	  count++;
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