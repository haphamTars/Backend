const Violation = require("../models/violation.model")
const Station = require("../models/station.model")
const ObjectId = require('mongodb').ObjectId;
const Tag = require("../models/tag.model")
const Vehicle = require("../models/vehicle.model")

function extractObjectId(input) {
    // Remove "new ObjectId(" from the beginning of the input
    const startIndex = input.indexOf('"') + 1;
    // Remove the trailing ")"
    const endIndex = input.lastIndexOf('"');
    // Extract the substring containing the ObjectId
    const objectId = input.substring(startIndex, endIndex);
    // Return the extracted ObjectId
    return objectId;
}


const ViolationController = {

    addViolation: async (req, res) => {
        try {
            const dataViolation = req.body.violation
            const newViolation = new Violation(dataViolation)
            console.log(newViolation)
            const saveViolation = await newViolation.save()
            res.status(200).json(saveViolation)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    collect: async (data) => {
        tagSerial = data.tagSerial
        stationSerial = data.stationiSerial
        tag = await Tag.findOne({ tagSerial: tagSerial })
        station = await Station.findOne({ serial: stationSerial })
        console.log(tag)
        console.log(station)
        tagId = tag._id.toString()
        vehicle = await Vehicle.findOne({ tag: tag._id })
        console.log(vehicle)
        const violation = {
            tag: tag._id,
            station: station._id,
            vehicle: vehicle._id,
            time: data.time
        }

        const newViolation = new Violation(violation)
        try {
            const res = await newViolation.save()
        } catch (err) {
            console.log(err)
        }
    },

    getAllViolation: async (req, res) => {
        try {
            const violations = await Violation.paginate({}, {
                page: 1,
                size: 10,
                populate: [
                    'station', 'vehicle'
                ]
            })
            res.status(200).json(violations);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getViolation: async (req, res) => {
        try {
            console.log('get vio')
            const startDate = req.params.startDate
            const endDate = req.params.endDate
            const stationSerial = req.params.stationSerial
            const size = req.params.size
            const page = req.params.page
            // var station = await Station.findOne({ _id: ObjectId(stationSerial) })
            // console.log(station)
            // console.log(Station)
            const filters = {
                time: {
                    $gte: startDate,
                    $lt: endDate,
                },
                station: stationSerial
            };
            console.log('ac')
            const option = {
                page: page,
                limit: size,
                populate: [
                    { path: 'station' },
                    { path: 'vehicle', populate: [{ path: 'person' }] }
                ]
            }
            const violations = await Violation.paginate(filters, option)
            res.status(200).json(violations)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = ViolationController