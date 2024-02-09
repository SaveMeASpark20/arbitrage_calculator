const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const oneXBetRouter = require('./routes/1xbet-router')
const sportPlusRouter = require('./routes/sportplus-router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
    origin : ['http://127.0.0.1:5500', 'https://savemeaspark20.github.io' ],
    credentials : true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', oneXBetRouter)
app.use('/', sportPlusRouter)

const port = process.env.PORT || 4001;

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})