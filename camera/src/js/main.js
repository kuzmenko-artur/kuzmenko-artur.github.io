//Первичный вывод товаров на страницу
$('document').ready(function(){
  loadGoods();
});

function loadGoods() {
  //Выгружаю товары на страницу
  $.getJSON('https://my-json-server.typicode.com/aero-frontend/test-task/PRODUCTS_SUCCESS', function ( data ) {
    var json = data;
    var source = $("#div-template").html();
    var template = Handlebars.compile(source, {
      noEscape: true
    });
    var html = template(json);
    $(".product-wrapper").html(html);
  });
};

//Добавление товара в избраное
$(document).on('click', '.favorites', function () {
  //Запись в переменную значения атрибутов data-id
  var someVal = $(this).attr('data-id');
  //Ajax запрос
  $.ajax({
    url: 'https://my-json-server.typicode.com/aero-frontend/test-task/FAVORITE_SUCCESS',
    type: 'post',
    data: {productID: someVal},
    dataType: 'json',
    success: function(){
      //Покраска иконки в другой цвет
      $('.favorites[data-id = ' + someVal + ']').html(function(data) {
        var id = $(this).hasClass('simple');
        if (!id) {
        $(this).addClass('simple');
        } else {
        $(this).removeClass('simple');
        }
        })
      },
    error: function() {
      //Сообщение об ошибке в консоль
      $.getJSON('https://my-json-server.typicode.com/aero-frontend/test-task/FAVORITE_FAIL', function (data) {
        var fail = data.data.message
        console.log(fail);
      })
    }
  });
});

//Фильтр товаров
$(document).on('click', '#btnShow', function () {
  //Запись в переменную значения чекбоксов
  var checkbox=$('.navigation__filter--cameras input:checkbox:checked').map(function() {return this.value;}).get();
  //Ajax запрос
  $.ajax({
    url: 'https://my-json-server.typicode.com/aero-frontend/test-task/FILTER_SUCCESS',
    type: 'post',
    data: {filters:checkbox},
    dataType: 'json',
    success: function(data) {
      //Выгружаю товары на страницу
      $.getJSON('https://my-json-server.typicode.com/aero-frontend/test-task/FILTER_SUCCESS', function ( data ) {
        var json = data;
        var source = $("#div-template").html();
        var template = Handlebars.compile(source, {
          noEscape: true
        });
        var html = template(json);
        $(".product-wrapper").html(html);
        });
      },
    error: function() {
      //Сообщение об ошибке в консоль
      $.getJSON('https://my-json-server.typicode.com/aero-frontend/test-task/FILTER_FAIL', function (data) {
        var fail = data.data.message
        console.log(fail);
      })
    }
  });
});