//Gera um array de números randômicos
function gerarRandom() {
  var arr = []
  while(arr.length < 7){
      var randomnumber = Math.ceil(Math.random()*100)
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr;
}

//Contrói e renderiza o gráfico
function renderChart(dados, elmID, type='line') {
  var ctx = document.getElementById(elmID).getContext('2d');
  var myChart = new Chart(ctx, {
    type: type,
      data: {
        labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        datasets: [{
          data: dados,
          backgroundColor: "transparent",
          borderColor:'#009EC2',
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

//Exibe número de forma animada
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