// Initialize your app
var myApp = new Framework7({
    
});

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

function gerarRandom() {
  var arr = []
  while(arr.length < 7){
      var randomnumber = Math.ceil(Math.random()*100)
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr;
}

var myChart = renderChart(gerarRandom(), 'myChart')

function renderChart(dados, elmID) {
  var ctx = document.getElementById(elmID).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        datasets: [{
          data: dados,
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
  return myChart
}

$('.periodo').on('click', function(){
  $('.periodo').removeClass('periodo-selecionado');
  $(this).addClass('periodo-selecionado');
  myChart.destroy()
  renderChart(gerarRandom(), 'myChart')
  animateNumbers(4203.56, $('.current-money'));
})

//Evento de abertura da página de detalhes da ação
$$('.stock-row').on('click', function(){
  mainView.router.loadPage('ativo.html');
})

animateNumbers(4203.56, $('.current-money'));

function animateNumbers(numero, elemento){
//Animação da contagem de números
var decimal_places = 2;
var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
elemento
  .animateNumber(
    {
      number: numero * decimal_factor,

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
}




//Eventos de click na tabbar
$('.tab-link').on('click', function(event){
  return false;
});

$('#tab-carteira').on('click', function(){

  if($(this).hasClass("active")){
    return;
  }
  $('#current-money').html('00,00')
  $('.tab-link').removeClass('active')
  $('.periodo').removeClass('periodo-selecionado')
  $(".periodo").eq(0).addClass("periodo-selecionado");
  $(this).addClass('active')
  changeTabEffect('#carteira')
  $('.navbar-titulo').html('');
  setTimeout(function(){ 
    animateNumbers(4203.56, $('.current-money'))
    renderChart(gerarRandom(), 'myChart') 
  }, 400);
  
})

$('#tab-cotacoes').on('click', function(event){
  if($(this).hasClass("active")){
    return;
  }
  $('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#cotacoes')
  $('.navbar-titulo').html('$4203.56');
  $('.navbar-titulo').css('left', '0px');
});

$('#tab-transacoes').on('click', function(event){
  if($(this).hasClass("active")){
    return;
  }
  $('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#transacoes')
  $$('.navbar-titulo').html('$4203.56');
  $('.navbar-titulo').css('left', '0px');
});

$$('#tab-noticias').on('click', function(){
  if($(this).hasClass("active")){
    return;
  }
	$('.tab-link').removeClass('active')
  $(this).addClass('active')
  changeTabEffect('#noticias')
  $('.navbar-titulo').html('$4203.56');
  $('.navbar-titulo').css('left', '0px');
})

function changeTabEffect(show) {
  function callb() {
    $('div.active').removeClass();
    $$('#icon-right').text('refresh');
    $(show).slideToggle('fast');
    $(show).addClass('active');
    myChart.destroy()
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

myApp.onPageInit('ativo', function (page) {
  var my2Chart = renderChart(gerarRandom(), 'ativoChart')
  animateNumbers(853.00, $('#share-value'))

  $('.periodo').on('click', function(){
    $('.periodo').removeClass('periodo-selecionado');
    $(this).addClass('periodo-selecionado');
    my2Chart.destroy()
    renderChart(gerarRandom(), 'ativoChart')
  })
});


