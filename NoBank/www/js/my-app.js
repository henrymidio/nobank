// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

/*
 Provisoriamente colocar o código do index noescopo global aqui
*/
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    datasets: [{
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "transparent",
      borderColor:'#1BC191',
    }]
  },
  options: {
    title: {
      display: false
    },
    legend: {
            display: false
    },
    scales: {
	    xAxes: [{
	      display: false,
	        
	    }],
	    yAxes: [{
	        display: false,
	    }]
	}
  }
});

var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
$('.big-number').animateNumber({
    number: 10000,
    numberStep: comma_separator_number_step
  }, 800);

$$('#tab-ordens').on('click', function(){
	//myApp.hideNavbar('.navbar', true);
	//$$('.navbar').hide();
	$$('.navbar-titulo').text('$10.000,54');
	$$('#icon-right').text('refresh');
})

$$('#tab-carteira').on('click', function(){
	//myApp.showNavbar('.navbar', true);
	//$$('.navbar').show();
	$$('.navbar-titulo').text('');
	$$('#icon-right').text('search');
})

$$('#tab-noticias').on('click', function(){
	//myApp.showNavbar('.navbar', true);
	//$$('.navbar').hide();
	$$('.navbar-titulo').text('$10.000,54');
	$$('#icon-right').text('refresh');
})

/*

*/

myApp.onPageInit('index', function (page) {
    alert('jbh')
});

