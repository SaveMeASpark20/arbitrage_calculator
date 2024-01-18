const express = require('express')
const router = express.Router()
const { arbitrageCalculation } = require('../scraping/arbitrage-calculation-1xBet');


router.get('/', async (req, res) => {
    try{
        const resultCalculation = await arbitrageCalculation();
    
        res.send(resultCalculation);

    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Errror");
    }
})



module.exports = router;