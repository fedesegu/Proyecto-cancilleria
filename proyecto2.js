import puppeteer from "puppeteer";
import fs from "fs";

// const fs = require('fs'); 


async function extraerparrafos(url) {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
    const page = await browser.newPage();
    await page.goto(url);

    //obtiene los enlaces a archivos HTML
    const links = await page.$$eval('a', (elements) => elements.map((el) => el.href));
    // [href$=.htm]', 'a[href$=".html"

    //Array para almacenar los párrafos 
    const paragraphs = [];
    //Recorre los archivos HTML y extrae los párrafos
    for (let i=0; i <links.length; i++) {
      const fileUrl = links[i];
      const response = await page.goto(fileUrl);
      const content = await response.text();

    //Extrae los párrafos utilizando expresiones regulares o DOM
    const extractredParagraphs = content.match (/<p>(.*?)<\/p>/g);

    //Agrega los párrafos al array 
    paragraphs.push(...extractredParagraphs)

    //Guarda los párrafos en un archivo 
    fs.writeFileSync(`parrafos${i}`, paragraphs.join('\n'));

    }
    await browser.close();

}

//Llama a la función y pasa la URL de la página web
extraerparrafos('https://web.archive.org/web/20070513055106/http://www.argentina-rree.com/historia_indice01.htm');
