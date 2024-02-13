const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {

    res.send('You are in the Arbitrage Calculator');

})

module.exports = router;