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

    $('.navbar-titulo').html('$'+parseFloat(usuario.getCapitalInvestido()).toFixed(2));
    $('.navbar-titulo').css('left', '0px');

    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#cotacoes')   

  });

  $('#tab-transacoes').on('click', function(event){
    if($(this).hasClass("active")){
      return;
    }
    $('.navbar-titulo').html('$'+parseFloat(usuario.getCapitalInvestido()).toFixed(2));
    $('.navbar-titulo').css('left', '0px');

    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#transacoes')
  });

  $$('#tab-noticias').on('click', function(){
    if($(this).hasClass("active")){
      return;
    }
    $('.navbar-titulo').html('$'+parseFloat(usuario.getCapitalInvestido()).toFixed(2));
    $('.navbar-titulo').css('left', '0px');

    $('.tab-link').removeClass('active')
    $(this).addClass('active')
    changeTabEffect('#noticias')
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
  $('.stock-row').on('click', function(){
    var ticker = $(this).find(".stock-symbol").text();
    localStorage.setItem("ticker", ticker);
    mainView.router.loadPage('ativo.html');
  });
  $('.stock-ticker').on('click', function(){
        var ticker = $(this).find(".stock-symbol").text();
        localStorage.setItem("ticker", ticker);
        mainView.router.loadPage('ativo.html');
  });

  
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

  var my2Chart;
  var arrChart = [];
  var ticker = localStorage.getItem("ticker");
  $('.navbar-titulo').html(ticker);
  $('.navbar-titulo').css('left', '0px');

  $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval=60min&apikey=VFAVA1B9R16KT761", function success(result) {
    $('.price-change').html(result['Realtime Global Securities Quote']['09. Price Change']);
    $('.price-change-percentage').html(result['Realtime Global Securities Quote']['09. Price Change Percentage']);

    $.each(result, function( a, b ) {
    var count = 0;
    $.each(b, function( c, d ) {
        if(d['4. close']) {
          arrChart.push(d['4. close']);
          count++;
        }
          if(count > 7) {
            var lastUpdate = result["Meta Data"]["3. Last Refreshed"];
            my2Chart = renderChart(arrChart.reverse(), 'ativoChart', '', 'transparent');
            animateNumbers(arrChart[0], $('#share-value'));
            return false;
          }
      });
    });

  });

  $('.periodo').on('click', function(){
    $('.periodo').removeClass('periodo-selecionado');
    $(this).addClass('periodo-selecionado');
    my2Chart.destroy()
    renderChart(gerarRandom(), 'ativoChart', '', 'transparent')
  });
});

 
