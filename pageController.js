const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance) {
  try {
    const browser = await browserInstance;
    await pageScraper.scraper(browser);
    return browser;
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
