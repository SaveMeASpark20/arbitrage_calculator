const { oneXBet } = require('./1xbet');


const arbitrageCalculation = async() => {
    try {
        let result = [];
        let teamData = {};
        const scrapeData = await oneXBet();
        
        if(!scrapeData || !scrapeData.captionLabel || !scrapeData.captionLabel){
            throw new Error('There is something wrong in scrape data');
        }

        const captionLabelFiltered = await scrapeData.captionLabel;
        const marketValue = await scrapeData.marketValue;
        
        const marketValueFiltered = filterArbitrage(marketValue);
        for(let i = 0; i < captionLabelFiltered.length; i+=2){
            const {odds1, odds2} = odds(marketValueFiltered, i);
            const arbitrageCalculation = calculateArbitrageOdds(odds1, odds2);
            if(arbitrageCalculation >= 100){
                result.push(arbitrageCalculation.toFixed(3))
                teamOdds(i, teamData, captionLabelFiltered, marketValueFiltered);
            }
        }
        
        let localeDateTime = teamData ? (new Date()).toLocaleString(): null;
        return { teamData, result, localeDateTime };
        
    } catch (error) {
        throw new Error("arbitrage calculation 1xbet" + error);
    }
}

function filterArbitrage(marketValue){
    if(marketValue[1] == '-'){
        for(let i = 1; i < marketValue.length; i+=2){
            marketValue.splice(i, 1);
        }
    }   
    return marketValue;
}

function odds(marketValueFiltered, counter) {
    let odds1 = 1.0;
    let odds2 = 1.0;
         
    if(marketValueFiltered[counter] != '-'){
        odds1 = parseFloat(marketValueFiltered[counter]);
    }
    if(marketValueFiltered[counter + 1] != '-'){
        odds2 = parseFloat(marketValueFiltered[counter+ 1]);
    }
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


module.exports = {arbitrageCalculation}


