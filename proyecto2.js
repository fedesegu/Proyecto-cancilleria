import puppeteer from "puppeteer";

async function getDataFromWebPage() {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
    const page = await browser.newPage();
    await page.goto('https://web.archive.org/web/20070513055106/http://www.argentina-rree.com/historia_indice01.htm');
    await page.waitForSelector('body'); 
    let links = el => el.querySelectorAll('td > ul > li > font > a').href; 

    for(let index =0;index<links.length;++index){
        await page.click('a[href]')
        const data = await page.evaluate(() => {
            let parrafo = document.querySelector('p').innerText;
            return {
             parrafo
            }
          });
          console.log(data);
          await browser.close();
        }
        
       
      }
      getDataFromWebPage();


//     const data = await page.evaluate(() => {
//       const quotes = document.querySelectorAll("a");
//       const data = [...quotes].map((quote) => {
//         const quoteText = quote.querySelector(".text").innerText;
//         const author = quote.querySelector(".author").innerText;
//         const tags = [...quote.querySelectorAll(".tag")].map(
//           (tag) => tag.innerText
//         );
//         return {
//           quoteText,
//           author,
//           tags,
//         };
//       });
//       return data;
//     });
//     console.log(data);
//     await browser.close();
//   }
  
//   handleDynamicWebPage();
