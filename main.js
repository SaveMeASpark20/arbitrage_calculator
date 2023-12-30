const form = document.querySelector("#form-calculate");

// Add a change event listener to the form
form.addEventListener("input", (event) => {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9.]/g, '');

    const isValid = /^-?\d*\.?\d*$/.test(input);

    if(!isValid){
        const inputControl = event.target.parentElement;
        console.log(inputControl);
        const error = inputControl.querySelector('.error');
        error.innerText = "Invalid Input"

    }else{
         const inputControl = event.target.parentElement;
         const error = inputControl.querySelector('.error');
         error.innerText = "";
    }   
    
    

})

form.addEventListener("submit", calculateArbitrage)

function calculateArbitrage(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        const odds1 = parseFloat(data.get("odds1"));
        const odds2 = parseFloat(data.get("odds2"));
        const stake = parseFloat(data.get("stake"));
        const arbitrageOdds1 = (1/odds1)*100;
        const arbitrageOdds2 = (1/odds2)*100;

        const roundedArbitrageOdds1 = parseFloat(arbitrageOdds1.toFixed(3));
        const roundedArbitrageOdds2 = parseFloat(arbitrageOdds2.toFixed(3));

        const oddsResult = calculateArbitrageOdds(roundedArbitrageOdds1, roundedArbitrageOdds2);
        const oddsResultPercentage = oddsResult / 100;

        displayArbitrageOddsResult(roundedArbitrageOdds1,roundedArbitrageOdds2, oddsResult);

        const profitResult = calculateProfit(stake, oddsResultPercentage);
        displayProfit(profitResult);

        calculateAmountToBet(stake,roundedArbitrageOdds1, roundedArbitrageOdds2, oddsResultPercentage);
        const betAmount1 = calculateAmountToBet(stake, roundedArbitrageOdds1, oddsResultPercentage);
        const betAmount2 = calculateAmountToBet(stake, roundedArbitrageOdds2, oddsResultPercentage);
        displayAmountToBet(betAmount1, betAmount2);

        const betNeedToOdds2 = calculateOtherBet(stake, odds1, odds2);
        const roundBetNeedToOdds2 = parseFloat(betNeedToOdds2.toFixed(2));
        const betNeedToOdds1 = calculateOtherBet(stake, odds2, odds1); 
        const roundBetNeedToOdds1 = parseFloat(betNeedToOdds1.toFixed(2));

        displayBetNeeds(roundBetNeedToOdds2, roundBetNeedToOdds1);

        const profitBasedOntheBetWin2Odd1 = calculateProfitBaseOntheBetWin(stake, odds1, roundBetNeedToOdds2);
        const profitBasedOntheBetWin2Odd2 = calculateProfitBaseOntheBetWin(roundBetNeedToOdds2, odds2, stake);
        const profitBasedOntheBetWin1Odd1 = calculateProfitBaseOntheBetWin(stake, odds2, roundBetNeedToOdds1);
        const profitBasedOntheBetWin1Odd2 = calculateProfitBaseOntheBetWin(roundBetNeedToOdds1, odds1, stake);
        displayProfitBaseOntheBetWin(profitBasedOntheBetWin1Odd1, profitBasedOntheBetWin1Odd2, profitBasedOntheBetWin2Odd1, profitBasedOntheBetWin2Odd2);

        displayStake(stake);
}

function calculateArbitrageOdds(roundedArbitrageOdds1, roundedArbitrageOdds2){
    const oddsResult = roundedArbitrageOdds1 + roundedArbitrageOdds2; 
    return oddsResult;
    
}

function displayArbitrageOddsResult(arbitrageOdds1, arbitrageOdds2, oddsResult) {
    const result = document.getElementById("odd-result");
    result.innerHTML = `${arbitrageOdds1}% + ${arbitrageOdds2}% = ${oddsResult}%`;
}

function calculateProfit(stake, oddsResultPercentage){
    
    const profitResult = (stake / oddsResultPercentage) - stake;
    const profitResultRounded = profitResult.toFixed(2);
    return profitResultRounded;
}

function displayProfit(profitResult){
    const profit = document.getElementById("profit");
    profit.innerHTML =  profitResult;
}

function calculateAmountToBet(stake,roundedArbitrageOdds, oddsResultPercentage){
    const percentageArbitrageOdds = roundedArbitrageOdds /100;
    return (stake * percentageArbitrageOdds) /oddsResultPercentage;
}

function displayAmountToBet(betAmount1, betAmount2){
    const bet1 = document.getElementById("bet1");
    const bet2 = document.getElementById("bet2");
    
    bet1.innerHTML = betAmount1.toFixed(2);
    bet2.innerHTML = betAmount2.toFixed(2);
}
function calculateOtherBet(stake, otherOdds, oddsToBet) {
    return stake * (otherOdds / oddsToBet);
}


function displayBetNeeds(roundBetNeedToOdds1, roundBetNeedToOdds2){
    document.getElementById('needToBet1').innerHTML = roundBetNeedToOdds1;
    document.getElementById('needToBet2').innerHTML = roundBetNeedToOdds2;
}

function calculateProfitBaseOntheBetWin(amountStake, odds, amountOtherBets){
    return (amountStake * odds) - (amountStake + amountOtherBets);
     
}

function displayProfitBaseOntheBetWin(profitBasedOntheBetWin1Odd1, profitBasedOntheBetWin1Odd2, profitBasedOntheBetWin2Odd1, profitBasedOntheBetWin2Odd2){
    document.getElementById('win1-odds1').innerHTML = profitBasedOntheBetWin1Odd1.toFixed(2);
    document.getElementById('win1-odds2').innerHTML = profitBasedOntheBetWin1Odd2.toFixed(2);
    document.getElementById('win2-odds1').innerHTML = profitBasedOntheBetWin2Odd1.toFixed(2);
    document.getElementById('win2-odds2').innerHTML = profitBasedOntheBetWin2Odd2.toFixed(2);
}

function displayStake(bet){
    const stakes = document.getElementsByClassName("stake");


    for(const stake of stakes) {
        stake.textContent = bet;
    }
}


//odds1 
//(currentbet x odds1) - (currentbet + oppositbet); 

//odds2
//(oppositbet x odds2) - (oppositbet + currentbet);