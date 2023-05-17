const Station = require("../models/station.model")

const StationController = {

    addStation: async(req,res) => {
        try {
            const dataStation = req.body.station
            const newStation = new Station(dataStation)
            console.log(newStation)
            const saveStation = await newStation.save()
            res.status(200).json(saveStation)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getAllStation: async(req, res) => {
        try {
            const stations = await Station.find();
            res.status(200).json(stations);
        } catch (err) {
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

module.exports = StationController