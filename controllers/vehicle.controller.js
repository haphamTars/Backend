const Vehicle = require("../models/vehicle.model")

const VehicleController = {

    addVehicle: async(req,res) => {
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

    getAllVehicle: async(req, res) => {
        try {
            const vehicles = await Vehicle.find().populate('tag')
            res.status(200).json(vehicles);
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

module.exports = VehicleController