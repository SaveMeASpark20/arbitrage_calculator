const express = require('express')
const router = express.Router()
const { arbitrageCalculation } = require('../scraping/arbitrage-calculation-1xBet');


router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const sseInterval = setInterval(async () => {        
        try{
            const resultCalculation = await arbitrageCalculation();
            // console.log(resultCalculation);
            res.write(`data: ${JSON.stringify(resultCalculation)}\n\n`);
    
        }catch(error){
            console.log('Error in SSE stream: ', error);
            res.write(`data: ${JSON.stringify({error: 'Internal Server Error'})}\n\n`);
            res.end();
        }
    },50000);
    
    

    req.on('close', () => {
        clearInterval(sseInterval);
    })
})

module.exports = router;