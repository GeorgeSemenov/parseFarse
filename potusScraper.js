//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
//npm install --save request request-promise cheerio puppeteer
fs = require('fs');//Библотека fileStream - позволяет работать с файлами на твоём компуке.
const $ = require('cheerio');//Библиотека, позволяющаяя непосредственно парсить (перемещаться
                             // между тэгами используя селекторы CSS)
const rp = require('request-promise');//Библиотека, которая позволяет делать запросы
                                      //На страницы в интернете и тянуть информацию
                                      //оттуда
const parseName = require('./parseName.js');//Подключаем наш модуль
                                          //по парсингу имён и днов
                                          //рожденньйов
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)//Заставляем парсить по указанному URL
  .then(function(html){//В случае успеха - запихиваем содержимое страницы в файл pareResult
    //success!
    const wikiUrls = [];
    const wikiNames = [];
    let arrLength = $('b > a', html).length;
    for (let i = 0; i < 10; i++) {
      wikiUrls.push( $('b > a', html)[i].attribs.href );//Собираем массив ссылок
      // wikiNames.push(( $('b > a', html)[i].attribs.title));//Обрати внимание
                                    //Что у ссылок нельзя извлечь текст
                                    //методом text() это делается через
                                    //свойство title
    }
    //console.log($('b > a', html));//выводим спарщенные ссылки с президенатми на экран
    return Promise.all(/*promise.all - получает массив или друой итерируемый объект
                        затем проходится по всем асинхронным
                        действиям(промисам) и выполняет их, возвращает
                        промис
                      */
      wikiUrls.map(function(url) {/*метод map создаёт новый массив
                                    изменённый указанной функцией
                                  */
        return parseName('https://en.wikipedia.org' + url);
                          /*в данном случае т.к. аттрибут href 
                            в спарщенных ссылках содержит не 
                            полный адресс, то указанная функция
                            добавляет недостающий кусочек адресса
                            , затем передаём эту ссылку в самодельный
                            модуль parseName, который делает асинхронный
                            запрос и возвращает promise/
                            Таким образом у нас получает массив промисов,
                            который обрабатывается и возвращается результативный
                            промис.
                          */
      })
    );
  })
  .then(function(presidents) {/*Далее, результативный промис, в случае
                                успеха (fullfiled) передаёт обработанные
                                результаты массива промисов в свою внутреннюю 
                                функцию
                              */
    totalArr = presidents.map(function(president){
      return '\n' + JSON.stringify(president);
    })
    console.log(presidents);// выводим массив результатов в консоль
    fs.writeFile('parseResult.txt', totalArr, function (err) {// Сохраняем данные в файл
      if (err) return console.log(err);//Сохраняем ошибку, если таковая будет
    });
  })
  .catch(function(err){//Если результативный массив завершится ошибкой
                       //то она будет выведенна на экран.
    console.log(err);
  });