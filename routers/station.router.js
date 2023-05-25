const stationRouter = require("express").Router()

const stationController = require("../controllers/station.controller")

stationRouter.post("/", stationController.addStation)

stationRouter.get("/", stationController.getAllStation)

stationRouter.delete("/:id", stationController.deleteById)

stationRouter.post("/import", stationController.importCsv)

module.exports = stationRouter
