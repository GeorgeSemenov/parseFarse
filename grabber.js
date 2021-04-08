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
  await page.pdf({path: './page-before-click.pdf'})
  await page.click('.b-combo__arrow');
  // const element = await page.$('.b-combo__arrow'); //Две следующие строки и строка выше - делают одно и тоже
  // await element.click();                           // Разница лишь в том, что эти две строки используют cheerio
  await page.pdf({path: './page-after-click.pdf'})
  //Подбробнее о методе поиска тут https://stackoverflow.com/questions/47407791/how-to-click-on-element-with-text-in-puppeteer
  // const button = await page.$x("//span[contains(., 'Разработка сайтов')]");
  try{
    await page.addStyleTag({path : './my-css.css'})
    await page.click('.b-combo__body_left > .b-combo__list > .b-combo__item:first-child');
    await page.click('.b-layout__right_bordleft_cdd1d3 .b-combo__list > .b-combo__item:first-child');
    await page.click('.b-layout__right_bordleft_cdd1d3 .b-combo__list > .b-combo__item:first-child > span');
  }
  catch (err){
    console.log('\n\n-----------Error description beginning-----------\n');
    console.log(err);
    console.log('\n-----------Error description end-----------\n\n')
    await browser.close();
  }

  
  await page.pdf({path: './page.pdf'}); //__dirname - указывает путь в корень твоего проекта
                                        // ./ - указывает путь к месту, где находится скрипт grabber.js
  await browser.close();
})();