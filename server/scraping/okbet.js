const puppeteer = require('puppeteer');

const okBet = async () => {
    const url = "https://www.okbet.com/sport/matches?game=BK&menu=parlay";
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Use waitUntil option

        const marketValueClassName = '.value span';

        const result = await page.$$eval(marketValueClassName, elements => {
            return elements.map(element => element.innerText);
        });

        console.log(result);
        return { marketValue: result };
    } catch (error) {
        console.error(`Error in okBet: ${error.message}`);
        
    } finally {
        await browser.close();
    }
};

module.exports = { okBet };
