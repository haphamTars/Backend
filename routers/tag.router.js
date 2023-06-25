const tagRouter = require("express").Router()

const tagController = require("../controllers/tag.controller")

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

tagRouter.post("/", tagController.addTag)

tagRouter.get("/", tagController.getAllTag)

tagRouter.get("/:id", tagController.getBySerial)

tagRouter.delete("/:id", tagController.deleteById)

tagRouter.post("/import", upload.single('file'), tagController.importCsv)

tagRouter.put("/:id", tagController.updatedTag)

module.exports = tagRouter
