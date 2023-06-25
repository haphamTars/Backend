const vehicleRouter = require("express").Router()

const vehicleController = require("../controllers/vehicle.controller")

vehicleRouter.post("/", vehicleController.createVehicle)

vehicleRouter.get("/", vehicleController.getAllVehicle)

vehicleRouter.delete("/:id", vehicleController.deleteById)

module.exports = vehicleRouter
