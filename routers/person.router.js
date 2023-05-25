const personRouter = require("express").Router()

const personController = require("../controllers/person.controller")

personRouter.post("/", personController.addPerson)
personRouter.post("/import", personController.importCsv)
personRouter.get("/", personController.getAllPerson)

module.exports = personRouter
