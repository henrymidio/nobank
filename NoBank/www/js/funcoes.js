
function isMarketOpen() {

  var dt = new Date();

  var dtDay = dt.getDay();

  if(dtDay == 0 || dtDay == 7) {
    return false;
  }
 
  var startTime = '10:30:00';
  var endTime = '17:00:00';

  var s =  startTime.split(':');
  var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dtDay, parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
  
  var e =  endTime.split(':');
  var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dtDay,parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

  if(dt >= dt1 && dt <= dt2) {
    $('body').addClass('layout-white').removeClass('layout-dark');
    return true;
  } else {
    $('body').addClass('layout-dark').removeClass('layout-white');
    return false;
  }
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "March",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  return day + ' ' + monthNames[monthIndex] + ' ' + hours+':'+minutes;
}


//Gera um array de números randômicos
function gerarRandom() {
  var arr = [];
  while(arr.length < 7){
      var randomnumber = Math.ceil(Math.random()*100)
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr;
}

//Contrói e renderiza o gráfico
function renderChart(dados, elmID, titulo) {
  var ctx = document.getElementById(elmID).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels: dados,
        datasets: [{
          data: dados,
          backgroundColor: "#009EC2",
          borderColor:'#009EC2',
        }]
      },
      options: {
        title: {
            display: true,
            text: titulo,
            fontColor: '#009EC2',
            fontStyle: 'normal'
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

//Exibe número de forma animada
function animateNumbers(numero, elemento){
  //Animação da contagem de números
  var decimal_places = 2;
  var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

  elemento.animateNumber(
    {
      number: numero * decimal_factor,

      numberStep: function(now, tween) {
        var floored_number = Math.floor(now) / decimal_factor,
            target = $(tween.elem);

        if (decimal_places > 0) {
          // force decimal places even if they are 0
          floored_number = floored_number.toFixed(decimal_places);

          // replace '.' separator with ','
          //floored_number = floored_number.toString().replace('.', ',');
        }
        //console.log(target.text())
        if(floored_number > parseFloat(target.text())) {
          //console.log(floored_number)
          target.text(floored_number);
        }
      }
    },
    500
  );
}

function renderNDXChart(myChart, arrChart, periodo) {
  var limite = 27;
  var time_series = 'TIME_SERIES_INTRADAY';
  switch(periodo) {
    case '1D':
        limite = 27;
        time_series = 'TIME_SERIES_INTRADAY';
        break;
  }

  $.getJSON("https://www.alphavantage.co/query?function="+time_series+"&symbol=ndx&interval=15min&apikey=VFAVA1B9R16KT761", function success(result) {
  $.each(result, function( a, b ) {
    var count = 0;
    $.each(b, function( c, d ) {
        if(d['4. close']) {
          arrChart.push(d['4. close']);
          count++;
        }
          if(count > limite) {
            myChart = renderChart(arrChart.reverse(), 'myChart', 'INDEXNASDAQ: NDX - ' + formatDate(new Date()) + ' GMT-4');
            return false;
          }
      });
    });
  });
}

function getVariationPercentage(firstPrice, lastPrice) {
  if(firstPrice > lastPrice) {
   var diff = lastPrice - firstPrice;
    var p = (diff/lastPrice) * 100;
    return p.toFixed(2);
  }
  var diff = lastPrice - firstPrice;
  var p = (diff/firstPrice) * 100;
  return p.toFixed(2);
}

function getPerColor(sinal) {
        var c = sinal.charAt(0);
        if(c == "-") {
          return "red";
        } else {
          return "blue";
        }
  }

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