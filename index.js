const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const db = require('./database/dbconnect');
const mqtt = require("mqtt")
const ViolationController = require("./controllers/violation.controller")

const tagRoute = require('./routers/tag.router')
const stationRoute = require('./routers/station.router')
const vehicleRoute = require('./routers/vehicle.router')
const violationRoute = require('./routers/violation.router')
const personRoute = require('./routers/person.router')
const clientId = 'f121f6d7-4891-4eae-be9d-400bb43a45ba'

db.initDbConnection()
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("common"))


app.use('/v1/tag', tagRoute)
app.use('/v1/station', stationRoute)
app.use('/v1/vehicle', vehicleRoute)
app.use('/v1/violation', violationRoute)
app.use('/v1/person', personRoute)


//MQTT section

const client = mqtt.connect("mqtt://broker.hivemq.com:1883")
client.on("connect", async function () {

    client.subscribe("/hapt/Pub", function (err) {
        if (err) {
            console.log(err.message);
        } else console.log("Server has subscribed successfully");
    });

});


client.on("message", (topic, message) => {

    try {
        console.log("received data: ");
        console.log(message.toString());
        data = JSON.parse(message.toString());
        console.log(data)
        ViolationController.collect(data)
    } catch (err) {
        console.log("error: ", err.message);
    }
})




app.listen(8000, () => {
    console.log('Server is running .....')
})