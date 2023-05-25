const Station = require("../models/station.model")
const csvParser = require('../helpers/parseCsv')

const StationController = {

    addStation: async (req, res) => {
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

    getAllStation: async (req, res) => {
        try {
            const stations = await Station.find();
            res.status(200).json(stations);
        } catch (err) {
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
            const filePath = 'uploads/station.csv';
            const header = ['serial', 'address'];

            const jsonArray = await parseCsvToJson(filePath, header);

            const updatedStations = [];

            for (const json of jsonArray) {
                const filter = { serial: json.serial };

                const existingStation = await Station.findOne(filter);

                if (existingStation) {
                    existingStation.address = json.address;

                    const updatedStation = await existingStation.save();
                    updatedStations.push(updatedStation);
                } else {
                    const newStation = new Station(json);
                    const savedStation = await newStation.save();
                    updatedStations.push(savedStation);
                }
            }

            res.status(200).json({
                message: 'CSV file imported successfully',
                data: updatedStations
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }

    }
}

module.exports = StationController