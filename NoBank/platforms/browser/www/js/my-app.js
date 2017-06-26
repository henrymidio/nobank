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

myApp.onPageInit('ativo', function (page) {
  var my2Chart;
  setTimeout(function() { 
    my2Chart = renderChart(gerarRandom(), 'ativoChart')
    animateNumbers(957.37, $('#share-value'))
  }, 500);

  $('.periodo').on('click', function(){
    $('.periodo').removeClass('periodo-selecionado');
    $(this).addClass('periodo-selecionado');
    my2Chart.destroy()
    renderChart(gerarRandom(), 'ativoChart')
  })
});

 myApp.onPageInit('index', function (page) {
            
            var myChart = renderChart([12, 34, 54, 11, 13, 6, 10], 'myChart')
            

            $('.periodo').on('click', function(){
              $('.periodo').removeClass('periodo-selecionado');
              $(this).addClass('periodo-selecionado');
              myChart.destroy()
              renderChart(gerarRandom(), 'myChart')
              animateNumbers(43852.57, $('.current-money'));
            })

            //Evento de abertura da página de detalhes da ação
            $$('.stock-row').on('click', function(){
              mainView.router.loadPage('ativo.html');
            })

            animateNumbers(43852.57, $('.current-money'));

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
              $(this).addClass('active')
              changeTabEffect('#carteira')
              $('.navbar-titulo').html('');
              setTimeout(function(){ 
                animateNumbers(43852.57, $('.current-money'))
                myChart = renderChart([12, 34, 54, 11, 13, 6, 10], 'myChart')
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

            //Tabelas montante e preços
            $$('#ativa-tab-valores').on('click', function(){
              $(this).toggleClass('active');
              $('#ativa-tab-montante').toggleClass('active');
              $('#tabela-valores').toggleClass('none');
              $('#tabela-montante').toggleClass('none');
            })
            $$('#ativa-tab-montante').on('click', function(){
              $(this).toggleClass('active');
              $('#ativa-tab-valores').toggleClass('active');
              $('#tabela-valores').toggleClass('none');
              $('#tabela-montante').toggleClass('none');
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
        }).trigger();
