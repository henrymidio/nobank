function Cotacoes() {
	
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
                  if(count > 13) {
                  	return false;
                  }
              });
            });
		});
		
	}
}