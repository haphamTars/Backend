const personRouter = require("express").Router()

const personController = require("../controllers/person.controller")

personRouter.post("/", personController.addPerson)
personRouter.post("/import", personController.importCsv)
personRouter.get("/", personController.getAllPerson)
personRouter.put("/:id", personController.updatePerson)
personRouter.delete("/:id", personController.deleteById)
module.exports = personRouter
