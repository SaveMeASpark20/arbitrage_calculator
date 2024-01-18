const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const oneXBetRouter = require('./routes/1xbet-router')
const okBetRouter = require('./routes/okbet-router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
    origin : '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions))
app.use('/', oneXBetRouter)
app.use('/', okBetRouter)

const port = 4000

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})