const puppeteer = require('puppeteer');
require("dotenv").config();
const oneXBet = async () => {
    const url = "https://1xbet.ph/en/live/basketball/2626462-nba-2k24-cyber-league";
    const browser = await puppeteer.launch({ 
        headless: true, 
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
          ],
          executablePath:
            process.env.NODE_ENV === "production"
              ? process.env.PUPPETEER_EXECUTABLE_PATH
              : puppeteer.executablePath(),
        timeout: 60000,
    });
    
    try {
        const page = await browser.newPage();

        await page.goto(url, { timeout: 90000 }); // Set timeout to 60 seconds

        const marketValueClassName = '.betting-main-dashboard .dashboard-game .ui-market__value';
        const captionLabelClassName = '.betting-main-dashboard .dashboard-game .caption__label';

        const getElementsInnerText = async (page, marketValueClassName, captionLabelClassName) => {
            const marketValue = await page.waitForSelector(marketValueClassName, { timeout: 600000 })
                .then(() => page.$$eval(marketValueClassName, elements => elements.map(element => element.innerText)))
                .catch(error => {
                    console.error(`Error 1xbet: ${error.message}`);
                    return null;
                });
    
            const captionLabel = await page.waitForSelector(captionLabelClassName, { timeout: 600000 })
                .then(() => page.$$eval(captionLabelClassName, elements => elements.map(element => element.innerText)))
                .catch(error => {
                    console.error(`Error 1xbet: ${error.message}`);
                    return null;
                });
    
            return { captionLabel, marketValue }; 
        };
    
        return await getElementsInnerText(page, marketValueClassName, captionLabelClassName);
    
    } catch (error) {
        console.error(`Error in oneXBet: ${error.message}`);
        return { marketValue: [], captionLabel: [] };
    } finally {
        await browser.close();
    }
};

module.exports = { oneXBet };
