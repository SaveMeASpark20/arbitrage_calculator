const express = require('express')
const router = express.Router()
const { arbitrageCalculationSportplus } = require('../scraping/arbitrage-calculation-sportplus');

router.get('/sportplus', async (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendSSEData = async () => {
        try{
            const resultCalculation = await arbitrageCalculationSportplus();
            
            res.write(`data: ${JSON.stringify(resultCalculation)}\n\n`);      
        }catch(error){
            console.error('Error in SSE stream:', error);
            res.write(`data: ${JSON.stringify({ error: 'Internal Server Error' })}\n\n`);
            res.end();
        }
    };
    const sseInterval = setInterval(sendSSEData, 50000);

    req.on('close', ()=> {
        clearInterval(sseInterval);
    })
})

module.exports = router;