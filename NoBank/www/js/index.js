/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
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
    }
};
