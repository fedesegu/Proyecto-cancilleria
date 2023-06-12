const { writeFile } = require("./helpers/file");

const initPage = async (browser, url) => {
  console.log(`Navigating to ${url}...`);
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("body");
  return page;
};

const retrieveChapters = async (page) =>
  page.$$eval("big", (elements) =>
    elements.map((el) => ({
      title: el.textContent.replace(/\s\s+/g, " ").trim(),
      links: [...el.closest("p").nextElementSibling.querySelectorAll("a")].map(
        (a) => `https://web.archive.org/web/20070513055106/${a.href}`
      ),
    }))
  );

const scraperObject = {
  url: "https://web.archive.org/web/20070513055106/http://www.argentina-rree.com/historia_indice01.htm",
  scraper: async (browser) => {
    const { url } = scraperObject;
    const indexPage = await initPage(browser, url);

    const chapters = await retrieveChapters(indexPage);

    console.log("chapters", chapters);

    // TODO: tenes que usar chapters, te puso solo el primero a modo de prueba, pero te perdes el 
    // resto de los chapters si lo dejas asi
    for (chapter of [chapters[0]]) {
      const chapterPages = await Promise.all(
        chapter.links.map(async (link, pageNumber) => {
          const chapterPage = await initPage(browser, link);

          return {
            title: chapter.title,
            pageNumber,
            body: await chapterPage.evaluate(() =>
              document.querySelector("body").innerHTML.trim()
            ),
          };
        })
      );

      // TODO: dsp de guardar, podes crear un html nuevo que tenga todos ls links a los capitulos
      // o podes concatenar todos los capitulos en un solo html y guardar ese finalmente
      chapterPages.forEach((page) => {
        writeFile(`./${page.title}_${page.pageNumber}.html`, page.body);
      });
    }
  },
};

module.exports = scraperObject;
