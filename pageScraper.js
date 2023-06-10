const scraperObject = {
	url: 'https://web.archive.org/web/20070513055106/http://www.argentina-rree.com/historia_indice01.htm',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
        // Wait for the required DOM to be rendered
		await page.waitForSelector('body');
		// Get the link to all the required books
		let urls = await page.$$eval('div > table > tbody > tr > td > table > tbody> tr > td > ul > li > font', links => {
			// Extract the links from the data
			links = links.map(el => el.querySelector('a').href)
			return links;
		});
		console.log(urls);
		
	}
}

module.exports = scraperObject;