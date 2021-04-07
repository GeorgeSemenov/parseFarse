//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
//npm install --save request request-promise cheerio puppeteer
fs = require('fs');//Библотека fileStream - позволяет работать с файлами на твоём компуке.
const $ = require('cheerio');//Библиотека, позволяющаяя непосредственно парсить (перемещаться
                             // между тэгами используя селекторы CSS)
const rp = require('request-promise');//Библиотека, которая позволяет делать запросы
                                      //На страницы в интернете и тянуть информацию
                                      //оттуда
const puppeteer = require('puppeteer');//данная Библиотека позволяет брать контент
                                       //с JS генерируемых сайтов, вроде reddit, или
                                       //fl.ru request-promise не сможет такие сайты
                                       //пограбить, и выдаст ошибку 503 Service Temporarily Unavailable
const url = 'https://www.fl.ru/projects/';

// puppeteer
//   .launch()
//   .then(function(browser){
//     return browser.newPage();
//   })
//   .then(function(page) {
//     return page.goto(url).then(function() {//Напоминаю - then обработчик промиссов
//       return page.content();               //первый его аргумент - функция, которая
//     });                                    //принимает и обрабатывает успешновыполненный промис       
//   })                                       //вторая(её тут нет) - неудачновыполненный
//   .then(function(html) {
//     $('h2', html).each(function() {
//       console.log($(this).text());
//     });
//     fs.writeFile('grapper.txt', html, function (err) {// Сохраняем данные в файл
//       if (err) return console.log(err);//Сохраняем ошибку, если таковая будет
//     });
//   })
//   .catch(function(err){
//     console.log(err);
//     //handle error
//   });


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.click('.b-combo__arrow');
  const button = await page.$x("//button[contains(., 'Разработка сайтов')]");
  await button.click();
  
  await page.pdf({path: __dirname + './page.pdf'});
  await browser.close();
})();