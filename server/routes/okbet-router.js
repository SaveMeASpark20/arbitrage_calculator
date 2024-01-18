const express = require('express')
const router = express.Router()
const { okBet } = require('../scraping/okbet');
router.get('/okbet', async (req, res) => {

    try{
        const resultCalculation = await okBet();
        res.send(resultCalculation);
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;