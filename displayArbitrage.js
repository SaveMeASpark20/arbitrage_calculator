const scrapingSection = document.querySelector('.scraping');

// fetch('http://localhost:4001/')
//     .then(response => response.json())
//     .then(data => {
//         if(!data.teamData || !data.result || !data.localeDateTime){
//             throw new Error("There's a missing data");
//         }
//         displayDateTimeAndWebName(data.localeDateTime, '1xBet');
//         const table = tableTemplate();
//         arbitrageOpportunity(table, data.teamData, data.result)
//     })
//     .catch(error => console.error('Error fetching data:', error));

const eventSourceSportplus = new EventSource('https://arbscalculator.onrender.com/sportplus/', 
    { withCredentials: true }
);

eventSourceSportplus.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(!data.teamData || !data.result || !data.localeDateTime){
        throw new Error("There's a missing data");
    }
    // console.log('SportPlus', event.data);
    displayDateTimeAndWebName(data.localeDateTime, 'SportBet');
    const table = tableTemplate();
    arbitrageOpportunity(table, data.teamData, data.result)
}

const eventSource1xBet = new EventSource('https://arbscalculator.onrender.com', 
    {withCredentials: true}
);

eventSource1xBet.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if(!data.teamData || !data.result || !data.localeDateTime){
        throw new Error("There's a missing data");
    }
    displayDateTimeAndWebName(data.localeDateTime, '1xBet');
    const table = tableTemplate();
    arbitrageOpportunity(table, data.teamData, data.result)
    // console.log('data', event.data);
}




// fetch('http://localhost:4001/sportplus')
//     .then(response => response.json())
//     .then(data => {
//         if(!data.teamData || !data.result || !data.localeDateTime){
//             throw new Error("There's a missing data");
//         }
//         displayDateTimeAndWebName(data.localeDateTime, 'SportBet');
//         const table = tableTemplate();
//         arbitrageOpportunity(table, data.teamData, data.result)
//     })  
//     .catch(error => console.error('Error fetching data:', error));



function displayDateTimeAndWebName(localeDateTime, webName){
    const timeOfScrape = document.createElement("p")
    timeOfScrape.textContent = localeDateTime;
    scrapingSection.appendChild(timeOfScrape);
    const nameOfWebsite = document.createElement("p")
    nameOfWebsite.textContent = webName;
    scrapingSection.appendChild(nameOfWebsite);
}

function tableTemplate(){
   
    const table = document.createElement("table");
    const headerRow = table.insertRow();

    const teamsHeader = document.createElement("th");
    teamsHeader.textContent = "Teams";
    headerRow.appendChild(teamsHeader);

    const odddsHeader = document.createElement("th");
    odddsHeader.textContent = "Odds";
    headerRow.appendChild(odddsHeader);

    const ResultsHeader = document.createElement("th");
    ResultsHeader.textContent = "Result";
    headerRow.appendChild(ResultsHeader);  

    return table;
}
function displayArbitrageOpportunity(table, team, odds, result){
    
    const row = table.insertRow();
    
    const teamCell = document.createElement("td");
    teamCell.textContent = team;
    row.appendChild(teamCell);

    const oddsCell = document.createElement("td");
    oddsCell.textContent = odds ? odds : "No Data";
    row.appendChild(oddsCell);

    if(result){
        const resultCell = document.createElement("td");
        resultCell.textContent = result ? result : "No Data";
        row.appendChild(resultCell);
    }

    scrapingSection.appendChild(table);
    
}

function arbitrageOpportunity(table, teamdata, result) {
    let displayResult = true;
    let resultCounter = 0;
    for(const [team, odds] of Object.entries(teamdata)){
        
        if(displayResult === true){
            displayArbitrageOpportunity(table, team, odds, result[resultCounter]);
            displayResult = false;
            resultCounter++;
        }else{
            displayArbitrageOpportunity(table, team, odds);
            displayResult = true;
        }
    }
}


  