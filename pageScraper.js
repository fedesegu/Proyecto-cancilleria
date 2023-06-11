const urlPrimaria = 'http://www.argentina-rree.com'
const scraperObject = {
	url: 'https://web.archive.org/web/20070513055106/http://www.argentina-rree.com/historia_indice01.htm',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
        // Wait for the required DOM to be rendered
		await page.waitForSelector('body');
		// Get the link to all the required books
		let urls = await page.$$eval(' td > ul > li', links => {
			// Extract the links from the data
			links = links.map(el => el.querySelector('font > a').href);
			return links;
		});
		// console.log(urls);
		
		

		// Loop through each of those links, open a new page instance and get the relevant data from them
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			dataObj['parrafos'] = await newPage.$eval('p', text => text.textContent);
			resolve(dataObj);
			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);
			console.log(currentPageData);
		}
		
	}
}

module.exports = scraperObject;