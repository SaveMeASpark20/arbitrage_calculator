const { oneXBet } = require('./1xbet');

const arbitrageCalculation = async() => {

    let result = [];
    try {
        
        const scrapeData = await oneXBet();
        const captionLabelFiltered = await scrapeData.captionLabel;
        const marketValueFiltered = scrapeData.marketValue; 

        console.log(captionLabelFiltered);

        if(marketValueFiltered[1] == '-'){
         
            for(let i = 1; i < marketValueFiltered.length; i+=2){
                marketValueFiltered.splice(i, 1);
            }
        }
                
        for(let j = 0; j < marketValueFiltered.length; j+=2){
            let teamName = 0;
            
            while(teamName < captionLabelFiltered.length){
                result.push(captionLabelFiltered[teamName]);
                result.push(captionLabelFiltered[teamName + 1]);
                teamName++;
                break;
            }
            console.log(teamName);

            let odds1 = 1.0;
            let odds2 = 1.0;
            
            if(marketValueFiltered[j] != '-'){
                
                 odds1 = parseFloat(marketValueFiltered[j]);
            }
            if(marketValueFiltered[j + 1] != '-'){
                
                odds2 = parseFloat(marketValueFiltered[j + 1]);
            }
            
            let arbitrageOdds1 = (1/odds1)*100;
            let arbitrageOdds2 = (1/odds2)*100;
    
            let roundedArbitrageOdds1 = parseFloat(arbitrageOdds1.toFixed(3));
            let roundedArbitrageOdds2 = parseFloat(arbitrageOdds2.toFixed(3));
    
            let oddsResult = calculateArbitrageOdds(roundedArbitrageOdds1, roundedArbitrageOdds2);
            
            result.push(oddsResult.toFixed(3));
        }
        
        return result;

    } catch (error) {
        console.log("Error:" + error);
    }

}

function calculateArbitrageOdds(roundedArbitrageOdds1, roundedArbitrageOdds2){
    const oddsResult = roundedArbitrageOdds1 + roundedArbitrageOdds2; 
    return oddsResult;   
}

module.exports = {arbitrageCalculation}


