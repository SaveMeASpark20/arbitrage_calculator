 const { sportPlus } = require("./sportplus")

const arbitrageCalculationSportplus = async() => {

    try {
        let result = [];
        let teamData = {};

        const scrapeData = await sportPlus();
    
        if(!scrapeData || !scrapeData.captionLabel || !scrapeData.captionLabel){
            throw new Error('There is something wrong in scrape data');    
        }

        const marketValue = await scrapeData.marketValue;
        const captionLabel = await scrapeData.captionLabel;

        for(let i = 0; i < marketValue.length; i+=2){
            const {odds1, odds2} = odds(marketValue, i);
            const arbitrageCalculation = calculateArbitrageOdds(odds1, odds2);
            if(arbitrageCalculation > 100 ){
                result.push(arbitrageCalculation.toFixed(3));
                teamOdds(i, teamData, captionLabel, marketValue);
            }
        }

        let localeDateTime = teamData ? (new Date()).toLocaleString(): null;
        return { teamData, result, localeDateTime };

    }catch (error) {
        throw new Error("Error arbitrage calculation sportplus:" + error);
    }
}

function odds(marketValue, counter){
    let odds1 = parseFloat(marketValue[counter]);
    let odds2 = parseFloat(marketValue[counter+ 1]);
    return {odds1, odds2};
}

function calculateArbitrageOdds(odds1, odds2){
    let arbitrageOdds1 = (1/odds1)*100;
    let arbitrageOdds2 = (1/odds2)*100;

    let roundedArbitrageOdds1 = parseFloat(arbitrageOdds1.toFixed(3));
    let roundedArbitrageOdds2 = parseFloat(arbitrageOdds2.toFixed(3));

    const oddsResult = roundedArbitrageOdds1 + roundedArbitrageOdds2; 
    return oddsResult;   
}

function teamOdds(indexValue, teamData, captionLabelFiltered, marketValueFiltered) {
    let index = indexValue;
    let counter = 0;
    while(counter < 2){
        let captionLabel = captionLabelFiltered[index];
        let marketValue = marketValueFiltered[index];
        teamData[captionLabel] = marketValue;
        counter++;
        index++;
    }
}

module.exports = {arbitrageCalculationSportplus};