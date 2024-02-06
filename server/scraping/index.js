import { arbitrageCalculation } from "./arbitrage-calculation.js";


const main = async() => {
    const resultCalculation = await arbitrageCalculation();
    
    displayCalculation(resultCalculation);
    
}   

function displayCalculation(arbitrageOdds) {
    const scrapingSection = document.querySelector('.scraping');
    
    if (!scrapingSection) {
        console.error('Scraping section not found in the DOM.');
        return;
    }

    arbitrageOdds.forEach(odds => {
        let p = document.createElement('p');
        p.textContent = odds;
        scrapingSection.appendChild(p);
    });
}

main();
