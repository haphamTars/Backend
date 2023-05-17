const Tag = require("../models/tag.model")

const tagController = {

    addTag: async(req,res) => {
        try {
            const dataTag = req.body.tag
            const newTag = new Tag(dataTag)
            console.log(newTag)
            const saveTag = await newTag.save()
            res.status(200).json(saveTag)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getAllTag: async(req, res) => {
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getBySerial: async(req, res) => {
        try {
            const tag = await Tag.findById(req.params.id);
            res.status(200).json(tag)
        } catch (error) {
            res.status(500).json(err)
        }
    },
    
    deleteById: async(req, res) => {
        try {
            const tag = await Tag.findByIdAndDelete(req.params.id);
            res.status(200).json(tag)
        } catch (error) {
            res.status(500).json(err)
        }
    }
    

}

module.exports = tagController