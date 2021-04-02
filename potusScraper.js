//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
fs = require('fs');//Библотека fileStream - позволяет работать с файлами на твоём компуке.
const ch = require('cheerio');//Библиотека, позволяющаяя непосредственно парсить (перемещаться
                             // между тэгами используя селекторы CSS)
const rp = require('request-promise');//Библиотека, которая позволяет делать запросы
                                      //На страницы в интернете и тянуть информацию
                                      //оттуда
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)//Заставляем парсить по указанному URL
  .then(function(html){//В случае успеха - запихиваем содержимое страницы в файл pareResult
    //success!
    const wikiUrls = [];
    const wikiNames = [];
    let arrLength = ch('b > a', html).length;
    for (let i = 0; i < arrLength; i++) {
      // console.log(`arrLength = ${arrLength}\ni = ${i}\ni < arrLength = ${i < arrLength}`);
      // wikiUrls.push( ch('b > a', html)[i].attribs.href );
      // wikiNames.push(( ch('b > a', html)[i].texttextContent ));
    }
    console.log('b > a [3] = ' + ch('b > a' , html)) 
    fs.writeFile('parseResult.txt', (ch('b > a' , html)[15]).text, function (err) {
      if (err) return console.log(err);
    });
    //console.log(ch('b > a', html));//выводим спарщенные ссылки с президенатми на экран
  })
  .catch(function(err){
    //handle error
  });
