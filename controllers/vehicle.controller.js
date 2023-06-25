const Vehicle = require("../models/vehicle.model")
const csvParser = require('../helpers/parseCsv')
const Tag = require('../models/tag.model')
const Person = require('../models/person.model')

const VehicleController = {

    createVehicle: async(req,res) => {
        try {
            const data = req.body.vehicle
            const tagSerial = data.tag
            const personId = data.person
            const type = data.type
            const vehicleSerial = data.serial
            const tag = await Tag.findOne({tagSerial: tagSerial})
            const person = await Person.findOne({identifier: personId})
            const newVehicle = new Vehicle({
                tag: tag._id,
                person: person._id,
                type: type,
                serial: vehicleSerial
            })
            const vehicle = await newVehicle.save()
            return res.status(200).json(newVehicle)
        } catch (err) {
            res.status(500).json(err)
        } 
    },

    addVehicle: async (req, res) => {
        try {
            const dataVehicle = req.body.vehicle
            const newVehicle = new Vehicle(dataVehicle)
            console.log(newVehicle)
            const saveVehicle = await newVehicle.save()
            res.status(200).json(saveVehicle)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getAllVehicle: async (req, res) => {
        try {
            const vehicles = await Vehicle.find().populate('tag').populate('person')
            res.status(200).json(vehicles);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteById: async (req, res) => {
        try {
            const tag = await Vehicle.findByIdAndDelete(req.params.id);
            res.status(200).json(tag)
        } catch (error) {
            res.status(500).json(err)
        }
    },

    importCsv: async (req, res) => {
        try {
            const filePath = 'uploads/vehicle.csv';
            const header = ['personIdentifier', 'type', 'tagSerial', 'serial'];

            const jsonArray = await parseCsvToJson(filePath, header);

            const updatedVehicles = [];

            for (const json of jsonArray) {
                const { personIdentifier, type, tagSerial, serial } = json;

                const person = await Person.findOne({ identifier: personIdentifier });
                const tag = await Tag.findOne({ tagSerial });

                if (person && tag) {
                    const filter = { person: person._id, tag: tag._id };

                    const existingVehicle = await Vehicle.findOne(filter);

                    if (existingVehicle) {
                        existingVehicle.type = type;
                        existingVehicle.serial = serial;

                        const updatedVehicle = await existingVehicle.save();
                        updatedVehicles.push(updatedVehicle);
                    } else {
                        const newVehicle = new Vehicle({ person: person._id, type, tag: tag._id, serial });
                        const savedVehicle = await newVehicle.save();
                        updatedVehicles.push(savedVehicle);
                    }
                }
            }

            res.status(200).json({
                message: 'CSV file imported successfully',
                data: updatedVehicles
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

module.exports = VehicleController