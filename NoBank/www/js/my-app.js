//Verifica se o pregão está aberto para setar o theme layout
isMarketOpen();

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


usuario = new User();

myApp.onPageInit('index', function (page) {
  //Renderiza o gráfico do índice Nasdaq
  var myChart;
  var arrChart = [];
  renderNDXChart(myChart, arrChart, '1D');

  //Calcula e exibe a variação total de capital
  $('.cap-diff-amount').text('00.00')
  var capInv = usuario.getCapitalInvestido();
  var capInit = usuario.getCapitalInicial();
  var capDiffAmount = (capInv - capInit);
  var percentageV = getVariationPercentage(capInit, capInv);
  var color = getPerColor(capDiffAmount.toString());
  if(color == 'blue') {
    $('.sinal').text('+');
    $('.cap-diff-per').text(percentageV + '%');
    animateNumbers(capDiffAmount, $('.cap-diff-amount'));
  } else {
    $('.sinal').text('-');
    $('.cap-diff-per').text(percentageV + '%');
    $('.cap-diff-amount').text(capDiffAmount.toString().substring(1))
  }


  usuario.renderPortfolioAmount();

  //Evento de atualização
  $('#refresh').on('click', function(){
    arrChart = [];
    renderNDXChart(myChart, arrChart, '1D');

    if($('#tab-cotacoes').hasClass('active')) {
      var cotadas = [];
      $(".stock-symbol").each(function() {
        var sy = $(this).html();
          cotadas.push(sy);
          $(this).parent().parent().addClass(sy);
      });
      renderHeaderIndex();
      renderCotacoes(cotadas);
    }

    if($('#ativa-tab-montante').hasClass("active")){
      $('#tabela-montante tbody').empty();
      usuario.renderPortfolioAmount();
    }
    if($('#ativa-tab-valores').hasClass("active")){
      $('#tabela-valores tbody').empty();
      usuario.renderPortfolioPrices();
    }
  })

  //Eventos de click na tabbar
  $('.tab-link').on('click', function(event){
    return false;
  });

  $('#tab-carteira').on('click', function(){
    if($(this).hasClass("active")){
      return;
    }
    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#carteira')
    $('.navbar-titulo').html('');
    
  })

  $('#tab-cotacoes').on('click', function(event){
    if($(this).hasClass("active")){
      return;
    }
    renderHeaderIndex();
    var cotadas = [];
    $(".stock-symbol").each(function() {
      var sy = $(this).html();
        cotadas.push(sy);
        $(this).parent().parent().addClass(sy);
    });
    renderCotacoes(cotadas);
    
    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#cotacoes')
    $('.navbar-titulo').html('$'+usuario.getCapitalInvestido());
    $('.navbar-titulo').css('left', '0px');   
  });

  $('#tab-transacoes').on('click', function(event){
    if($(this).hasClass("active")){
      return;
    }
    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#transacoes')
    $('.navbar-titulo').css('left', '0px');
  });

  $$('#tab-noticias').on('click', function(){
    if($(this).hasClass("active")){
      return;
    }
      $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#noticias')
    $('.navbar-titulo').css('left', '0px');
  })

  //Tabelas montante e preços
  $$('#ativa-tab-valores').on('click', function(){
    usuario.renderPortfolioPrices();  
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

  //Evento de abertura da página de detalhes da ação
  $$('.stock-row').on('click', function(){
    mainView.router.loadPage('ativo.html');
  })

  
}).trigger();

myApp.onPageInit('a-mercado', function (page) {
  $('#ordena').on('click', function(){
      myApp.confirm('Tem certeza que deseja executar esta operação?', function () {
          myApp.alert('Sua ordem foi executada com sucesso!');
          mainView.router.loadPage('index.html');
      });
  });
});

myApp.onPageInit('ativo', function (page) {
  //Verifica se o mercado está aberto para liberar os botões de compra/venda
  if(!isMarketOpen()) {
    $('.ordenar').addClass('button-disabled').attr('data-popup', '#');
  }

  //Aguarda 500ms após a renderização da página para renderizar o gráfico
  var my2Chart;
  setTimeout(function() { 
    my2Chart = renderChart(gerarRandom(), 'ativoChart', '')
    animateNumbers(957.37, $('#share-value'))
  }, 500);

  $('.periodo').on('click', function(){
    $('.periodo').removeClass('periodo-selecionado');
    $(this).addClass('periodo-selecionado');
    my2Chart.destroy()
    renderChart(gerarRandom(), 'ativoChart', '')
  });
});

 
