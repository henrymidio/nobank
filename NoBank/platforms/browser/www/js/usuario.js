function User(id) {

	/*
		Colocar aqui a funcção construtora
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

	this.getCapitalInvestido = function() {
		localStorage.getItem("capitalInvestido")
	}
	this.setCapitalInvestido = function() {
	}

	this.getCapitaldisponivel = function() {
		localStorage.getItem("capitalInvestido")
	}
	this.setCapitalDisponivel = function() {
	}

	this.getPortfolio = function() {
		localStorage.getItem("portfolio")
	}
	this.setPortfolio = function() {
	}

	this.buyStock = function(qnt, cod) {

	}
	this.sellStock = function(qnt, cod) {
		
	}
}