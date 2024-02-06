const observer = new MutationObserver(() => {
   if(document.querySelectorAll('table')){
    arbitrageFound();
   }
})


// const observer = new MutationObserver((mutationsList, observer) => {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         initializeTables();
//       }
//     }
//   });

  // Start observing changes in the document
  observer.observe(document.body, { childList: true, subtree: true });

  function arbitrageFound() {
    
    const tables = document.querySelectorAll('table')

    listenToclick(tables)
  }

  function listenToclick(tables) {
    tables.forEach(table => {
      table.addEventListener('click', (event) => {
        const target = event.target;
        if(target.tagName === 'TD'){
          const row = target.parentNode;
          const cells = row.getElementsByTagName('td');
          console.log(cells);
          if(cells.length === 2){
            const oppositeTeam = row.previousElementSibling;
            const oppositeCells = oppositeTeam.getElementsByTagName('td');
            const odds2 = cells[1].textContent;
            const odds1 = oppositeCells[1].textContent;
            displayOddsToInputForm(odds1, odds2);
          }else {
            const oppositeTeam = row.nextElementSibling;
            const oppositeCells = oppositeTeam.getElementsByTagName('td');
            const odds2 = oppositeCells[1].textContent;
            const odds1 = cells[1].textContent;
            displayOddsToInputForm(odds1, odds2);
          }
        }
        
      })
    })
  }

  function displayOddsToInputForm(odds1, odds2) {
    const odds1Input = document.querySelector("input[name='odds1']");
    const odds2Input = document.querySelector("input[name='odds2']");
    const stake = document.querySelector("input[name='stake']");
    
    odds1Input.value = odds1;
    odds2Input.value = odds2;
    stake.value = 100;
    
  }

  
  // Attach click event listener to tables with data
  // function initializeTables() {
  //   console.log("initialize");
  //   const tables = document.querySelectorAll('table');
  //   tables.forEach(table => {
  //     table.addEventListener('click', function(event) {
  //       const target = event.target;
  //       if (target.tagName === 'TD') {
  //         const row = target.parentNode;
  //         const cells = row.getElementsByTagName('td');
  //         if (cells.length === 3) {
  //           console.log('Result:', cells[2].innerText);
  //         } else if (cells.length === 2) {
  //           console.log('Odds:', cells[1].innerText);
  //         }
  //         row.classList.toggle('highlight');
  //       }
  //     });
  //   });
  // }
  
  // Call initializeTables initially
  // initializeTables();
