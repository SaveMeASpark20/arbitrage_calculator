const puppeteer = require('puppeteer');

const oneXBet = async () => {
    const url = "https://1xbet.ph/en/live/basketball/2626462-nba-2k24-cyber-league";
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Set timeout to 60 seconds

        const marketValueClassName = '.betting-main-dashboard .dashboard-game .ui-market__value';
        const captionLabelClassName = '.betting-main-dashboard .dashboard-game .caption__label';

        const result = await Promise.all([
            page.$$eval(marketValueClassName, elements => elements.map(element => element.innerText)),
            page.$$eval(captionLabelClassName, elements => elements.map(element => element.innerText))
        ]);

        const [marketValue, captionLabel] = result;

        console.log({ marketValue, captionLabel });
        return { marketValue, captionLabel };
    } catch (error) {
        console.error(`Error in oneXBet: ${error.message}`);
        return { marketValue: [], captionLabel: [] };
    } finally {
        await browser.close();
    }
};

module.exports = { oneXBet };
