const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const db = require('./database/dbconnect');

const tagRoute = require('./routers/tag.router')
const stationRoute = require('./routers/station.router')
const vehicleRoute = require('./routers/vehicle.router')
const violationRoute = require('./routers/violation.router')

db.initDbConnection()
app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))


app.use('/v1/tag', tagRoute)
app.use('/v1/station', stationRoute)
app.use('/v1/vehicle', vehicleRoute)
app.use('/v1/violation', violationRoute)

app.listen(8000, () => {
    console.log('Server is running .....')
})