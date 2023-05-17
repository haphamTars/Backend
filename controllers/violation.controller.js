const Violation = require("../models/violation.model")
const Station = require("../models/station.model")

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

    getAllViolation: async (req, res) => {
        try {
            const violations = await Violation.paginate({},{
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
            const startDate = req.params.startDate
            const endDate = req.params.endDate
            const stationSerial = req.params.stationSerial
            const size = req.params.size
            const page = req.params.page
            var station = await Station.find({ serial: stationSerial })
            const filters = {
                time: {
                    $gte: startDate,
                    $lt: endDate,
                },
                station: station
            };
            const option = {
                page: page,
                limit: size,
                populate: ['station', 'vehicle']
            }
            const violations = await Violation.paginate(filters, option)
            res.status(200).json(violations)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = ViolationController