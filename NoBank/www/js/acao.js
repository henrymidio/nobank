function Acao(codigo) {
	var acao = 1;
	$.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+codigo+"&apikey=VFAVA1B9R16KT761", function success(result, status) {
        this.acao = result;
        alert(2)
     })

	this.getAcao = function () {
	   return acao;
	}
}