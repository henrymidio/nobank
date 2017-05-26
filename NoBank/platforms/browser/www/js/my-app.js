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

$$('.stock-row').on('click', function(){
  mainView.router.loadPage('ativo.html');
})

//Animação da contagem de números
// how many decimal places allows
var decimal_places = 2;
var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

$('#current-money')
  .animateNumber(
    {
      number: 4203.56 * decimal_factor,

      numberStep: function(now, tween) {
        var floored_number = Math.floor(now) / decimal_factor,
            target = $(tween.elem);

        if (decimal_places > 0) {
          // force decimal places even if they are 0
          floored_number = floored_number.toFixed(decimal_places);

          // replace '.' separator with ','
          floored_number = floored_number.toString().replace('.', ',');
        }

        target.text(floored_number);
      }
    },
    600
  );

  

//Eventos de click na tabbar
$('.tab-link').on('click', function(event){
  return false;
});

$('#tab-carteira').on('click', function(){
  $('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#carteira')
  $$('.navbar-titulo').text('');
})

$('#tab-cotacoes').on('click', function(event){
  //Ativa ícone da tabbar
  $('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#cotacoes')
  $$('.navbar-titulo').text('4203.56');
});

$('#tab-transacoes').on('click', function(event){
  //Ativa ícone da tabbar
  $('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#transacoes')
  $$('.navbar-titulo').text('4203.56');
});

$$('#tab-noticias').on('click', function(){
	$('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#noticias')
  $$('.navbar-titulo').text('4203.56');
})

function changeTabEffect(show) {
  function callb() {
    $('div.active').removeClass();
    $$('#icon-right').text('refresh');
    $(show).slideToggle('fast');
    $(show).addClass('active');
  }
  $('div.active').animate(
    {
      width: 'toggle'
    }, 
    200, 
    callb
  );
}

/*

*/

myApp.onPageInit('index', function (page) {
    alert('jbh')
});

