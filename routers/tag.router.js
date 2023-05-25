const tagRouter = require("express").Router()

const tagController = require("../controllers/tag.controller")

tagRouter.post("/", tagController.addTag)

tagRouter.get("/", tagController.getAllTag)

tagRouter.get("/:id", tagController.getBySerial)

tagRouter.delete("/:id", tagController.deleteById)

tagRouter.post("/import", tagController.importCsv)

module.exports = tagRouter
