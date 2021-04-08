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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.click('.b-combo__arrow');
  //Подбробнее о методе поиска тут https://stackoverflow.com/questions/47407791/how-to-click-on-element-with-text-in-puppeteer
  // const button = await page.$x("//span[contains(., 'Разработка сайтов')]");
  try{
    await (page.$x("//span[contains(., 'Разработка сайтов')]")).click;
    // await button.click();
  }
  catch (err){
    console.log(err);
    await browser.close();
  }

  
  await page.pdf({path: './page.pdf'}); //__dirname - указывает путь в корень твоего проекта
                                        // ./ - указывает путь к месту, где находится скрипт grabber.js
  await browser.close();
})();