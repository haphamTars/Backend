const Tag = require("../models/tag.model")
const csvParser = require('../helpers/parseCsv')

const tagController = {

    addTag: async (req, res) => {
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

    getAllTag: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getBySerial: async (req, res) => {
        try {
            const tag = await Tag.findById(req.params.id);
            res.status(200).json(tag)
        } catch (error) {
            res.status(500).json(err)
        }
    },

    deleteById: async (req, res) => {
        try {
            const tag = await Tag.findByIdAndDelete(req.params.id);
            res.status(200).json(tag)
        } catch (error) {
            res.status(500).json(err)
        }
    },

    importCsv: async (req, res) => {
        try {
            const filePath = 'uploads/tag.csv';
            const header = ['isActive', 'tagSerial'];

            const jsonArray = await parseCsvToJson(filePath, header);

            const updatedTags = [];

            for (const json of jsonArray) {
                const filter = { tagSerial: json.tagSerial };

                const existingTag = await Tag.findOne(filter);

                if (existingTag) {
                    existingTag.isActive = json.isActive;

                    const updatedTag = await existingTag.save();
                    updatedTags.push(updatedTag);
                } else {
                    const newTag = new Tag(json);
                    const savedTag = await newTag.save();
                    updatedTags.push(savedTag);
                }
            }

            res.status(200).json({
                message: 'CSV file imported successfully',
                data: updatedTags
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }


}

module.exports = tagController