const express = require('express')
const router = express.Router()
const { arbitrageCalculationSportplus } = require('../scraping/arbitrage-calculation-sportplus');

router.get('/sportplus', async (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sseInterval2 = setInterval(async () => {
        // console.log("pumasok sa sportplus");
        try{
            const resultCalculation = await arbitrageCalculationSportplus();
            console.log(resultCalculation);
            res.write(`data: ${JSON.stringify(resultCalculation)}\n\n`);      
        }catch(error){
            console.error('Error in SSE stream:', error);
            res.write(`data: ${JSON.stringify({ error: 'Internal Server Error' })}\n\n`);
            res.end();
        }
    }, 50000);


    req.on('close', ()=> {
        clearInterval(sseInterval2);
    })
})

module.exports = router;