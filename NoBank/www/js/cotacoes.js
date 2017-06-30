function Cotacoes() {
	var portfolio = [
		{
			'empresa': 'Starbucks',
			'simbolo': 'SBUX'
		},
		{
			'empresa': 'Tesla',
			'simbolo': 'TSLA'
		},
		{
			'empresa': 'Facebook',
			'simbolo': 'FB'
		},
		{
			'empresa': 'Apple',
			'simbolo': 'AAPL'
		},
		{
			'empresa': 'Alphabet Inc.',
			'simbolo': 'GOOGL'
		},
		{
			'empresa': 'Staples',
			'simbolo': 'SPLS'
		}
	]
	localStorage.setItem("cotacoes", JSON.stringify(portfolio));

	this.getNdx = function() {
		var arrChart = [];
		$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ndx&interval=60min&apikey=VFAVA1B9R16KT761", function success(result) {
            $.each(result['Meta Data'], function( a, b ) {
              var count = 0;
              $.each(b, function( c, d ) {
                  if(d['4. close']) {
                  	arrChart.push(d['4. close']);
                    count++;
				  }
                  if(count > 6) {return false}
              });
              
            });
            localStorage.setItem("ndx", arrChart);
            
		});
		
	}
}