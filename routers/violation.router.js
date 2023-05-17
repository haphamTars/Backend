const violationRouter = require("express").Router()

const violationController = require("../controllers/violation.controller")

violationRouter.post("/", violationController.addViolation)

violationRouter.get("/:page/:size", violationController.getAllViolation)

violationRouter.get("/:startDate/:endDate/:stationSerial/:page/:size", violationController.getViolation)

module.exports = violationRouter
