const puppeteer = require('puppeteer');
require("dotenv").config();
const sportPlus = async () => {
    const url = "https://www.sportsplus.ph/sbk/game/league/2/339";
    const browser = await puppeteer.launch({ 
        headless: "new", 
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
        await page.goto(url, { timeout: 90000 });

        const betCategory = ".s7k-bettype-filter .s7k-mr-2";
        const optionWinner = ".s7k-nav-wrapper .s7k-nav-wrapper-content li:nth-child(3)";


        await page.waitForFunction((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0;
                const isClickable = !element.disabled && !element.readOnly;
                return isVisible && isClickable;
            }
            return false;
        }, {}, betCategory);

        // Click on the element
        await page.click(betCategory);

        await page.waitForSelector(optionWinner, {timeout: 90000});
        await page.click(optionWinner);
    
        const marketValueClassName = '.s7k-content-box  .s7k-bet-btn .s7k-points';
        const captionLabelClassName = '.s7k-content-box .s7k-competitor_box div p';

        const getElementsInnerText = async (page, marketValueClassName, captionLabelClassName) => {
            const marketValue = await page.waitForSelector(marketValueClassName, { timeout: 60000 })
            .then(() => page.$$eval(marketValueClassName, elements => elements.map(element => element.innerText)))
            .catch(error => {
                console.error(`Error in sportplus marketValue: ${error.message}`);
                return null
            })
            const captionLabel = await page.waitForSelector(captionLabelClassName, { timeout: 60000 })
            .then(() => page.$$eval(captionLabelClassName, elements => elements.map(element => element.innerText)))
            .catch(error => {
                console.error(`Error in sportplus caption label: ${error.message}`);
                return null
            })

            return {marketValue, captionLabel};
        }

        return await getElementsInnerText(page, marketValueClassName, captionLabelClassName);
         
    } catch (error) {
        console.error(`Error Catch in sportplus: ${error.message}`);
        return { marketValue: [], captionLabel: [] };
    } finally {
        await browser.close();
    }
};

module.exports = { sportPlus };

      