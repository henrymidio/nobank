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

  //E seta a variação total de capital
  usuario.renderPortfolioAmount();

  //Calcula e exibe a variação total de capital
  //renderTotalCapital();

  $('#menu-disponivel').text(usuario.getCapitalDisponivel());
  
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

    renderTotalCapital();
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

    var transacoes = usuario.getHistorico();
    $('#transacoes ul').empty();
    for (var index in transacoes) {
      var line = '<li>'
      + '<div class="item-content">'
      + '<div class="item-inner">'
      + '<div class="item-title-row">'
      + '<div class="item-title"><b><span class="transacao-ticker">'+transacoes[index]['ticker']+'</span>: <span class="transacao-ordem">'+transacoes[index]['tipoDeOrdem']+'</span></b></div>'
      + '<div class="item-after">$'+transacoes[index]['valor']+'</div>'
      + '</div>'
      + '<div class="item-title-row">'
      + '<div class="item-title">'+transacoes[index]['dataTransacao']+'</div>'
      + '<div class="item-after">'+transacoes[index]['quantidade']+' ações</div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</li>';
      $('#transacoes ul').append(line);
        
    }

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
  $('#ordem-preco').attr("placeholder", localStorage.getItem('ativo-preco'));
  var tipoDeOrdem = localStorage.getItem("tipoDeOrdem");
  var portfolio = usuario.getPortfolio();

  var ticker = localStorage.getItem("ticker");
  var empresa = localStorage.getItem("legal_name");
  var valor = localStorage.getItem('ativo-preco');

  $('.executar-ordem').on('click', function(){
    var quantidade = $('.ordem-quantidade').val();
    var total = (valor * quantidade) + 10;
    var capitalDisponivel = usuario.getCapitalDisponivel();
    
      myApp.confirm('Tem certeza que deseja executar esta operação?', 'Nobank', function () {
          if(tipoDeOrdem == 'buy') {
            if(capitalDisponivel < total) {
              alert("Capital Insuficiente")
              return false;
            }
            var stock = {
              simbolo: ticker,
              empresa: empresa,
              quantidade: quantidade,
              pago: valor
            }
            usuario.buyStock(stock);
          }

          if(tipoDeOrdem == 'sell') {
            //Primeiramente verifica se há ações suficientes para venda
            var obj = getObjBySimbolo(portfolio, ticker);
            if(obj.quantidade < quantidade) { 
              alert('Número de ações insuficiente')
              return false; 
            }

            var stock = {
              simbolo: ticker,
              valor: valor
            }
            usuario.sellStock(stock, quantidade);
          }
          
          myApp.alert('Sua ordem foi executada com sucesso!');
          mainView.router.loadPage('index.html');
      });
  });

  $(".ordem-quantidade").keyup(function(){
      var total = (valor * $(this).val()) + 10;
      $('#ordem-total').val("$" + parseFloat(total).toFixed(2));
    });
});


myApp.onPageInit('ativo', function (page) {
  var my2Chart;
  var arrChart = [];
  var ticker = localStorage.getItem("ticker");

  //Verifica se o usuário possui papéis daquela ação para ativar o botão de venda
  if(usuario.hasStock(ticker)) {
    $('#sell-stock').removeClass('button-disabled').attr('data-popup', '.popup-ordem');
  }

  //Verifica se o mercado está aberto para liberar os botões de compra/venda
  if(!isMarketOpen()) {
    $('.ordenar').addClass('button-disabled').attr('data-popup', '#');
  }

  //Seta informações da ação
  $.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ticker+"&apikey=VFAVA1B9R16KT761", function success(result) {
    animateNumbers(result['Realtime Global Securities Quote']['03. Latest Price'], $('#share-value'));
    var priceChange = parseFloat(result['Realtime Global Securities Quote']['08. Price Change']).toFixed(2);

    var color = getPerColor(priceChange.toString());
    if(color == 'blue') {
      $('.prices').addClass('color-nasdaq')
    } else {
      $('.prices').addClass('color-red')
    }

    $('.price-change').html(priceChange + "USD");
    $('.price-change-percentage').html(result['Realtime Global Securities Quote']['09. Price Change Percentage']);
  });

  //Pega o valor de fechamento de preço de cada intervalo de 1 hora
  $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval=60min&apikey=VFAVA1B9R16KT761", function success(result) {
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
            return false;
          }
      });
    });
  });

  //Seta informações da ação
  $.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ticker+"&apikey=VFAVA1B9R16KT761", function success(result) {
    var abertura = parseFloat(result['Realtime Global Securities Quote']['04. Open (Current Trading Day)']).toFixed(2)
    var maximo = parseFloat(result['Realtime Global Securities Quote']['05. High (Current Trading Day)']).toFixed(2)
    var minimo = parseFloat(result['Realtime Global Securities Quote']['06. Low (Current Trading Day)']).toFixed(2)
    var volume = result['Realtime Global Securities Quote']['10. Volume (Current Trading Day)']
    var oscilacao = result['Realtime Global Securities Quote']['09. Price Change Percentage']
    var ultimaNegociacao = parseFloat(result['Realtime Global Securities Quote']['03. Latest Price']).toFixed(2)

    $('#abertura').text('$'+abertura)
    $('#maximo').text('$'+maximo)
    $('#minimo').text('$'+minimo)
    $('#volume').text(volume)
    $('#oscilacao').text(oscilacao)
    $('#ultima-negociacao').text('$'+ultimaNegociacao)

    localStorage.setItem("ativo-preco", ultimaNegociacao);
  });
  
  //Seta titulo da navbar e descrição da empresa (de outra api)
  $.ajax
  ({
    type: "GET",
    url: "https://api.intrinio.com/companies?ticker="+ticker,
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa("1c80288da8fc0d822a5534afc162c24f" + ":" + "98ddab52e25ca41f65ea0d60eb5f479c"));
    },
    success: function (d){
      $('.navbar-titulo').html(d.legal_name);
      $('.navbar-titulo').css('left', '0px');
     	$('#short-description').text(d.short_description) 
      localStorage.setItem("legal_name", d.legal_name);
    }
  });

  //Estabele o tipo de ordem a ser executada já que a tela para ambas operações é a mesma
  $('.ordenar').on('click', function(){
    var tipoDeOrdem = this.id;
    if(tipoDeOrdem == 'sell-stock') {
      localStorage.setItem('tipoDeOrdem', 'sell')
    } else {
      localStorage.setItem('tipoDeOrdem', 'buy')
    }
  });

  /*
  $('.periodo').on('click', function(){
    $('.periodo').removeClass('periodo-selecionado');
    $(this).addClass('periodo-selecionado');
    my2Chart.destroy()
    renderChart(gerarRandom(), 'ativoChart', '', 'transparent')
  });
*/
});
myApp.onPageBack('ativo', function (page) {
  $('.navbar-titulo').html('$'+parseFloat(usuario.getCapitalInvestido()).toFixed(2));
  $('.navbar-titulo').css('left', '0px');
});


