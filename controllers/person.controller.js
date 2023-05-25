const Person = require("../models/person.model")
const csvParser = require('../helpers/parseCsv')


const PersonController = {

    addPerson: async (req, res) => {
        try {
            const dataPerson = req.body.person
            const newPerson = new Person(dataPerson)
            console.log(newPerson)
            const savePerson = await newPerson.save()
            res.status(200).json(savePerson)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getAllPerson: async (req, res) => {
        try {
            const persons = await Person.find();
            res.status(200).json(persons);
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
            var jsonArray = await csvParser.parseCsvToJson('../uploads/person.csv', ['name', 'address', 'identifier', 'image', 'dob'])
            const updatedPersons = [];

            for (const json of jsonArray) {
                const filter = { identifier: json.identifier };

                // Try to find an existing person with the same identifier
                const existingPerson = await Person.findOne(filter);

                if (existingPerson) {
                    // Update the existing person
                    existingPerson.name = json.name;
                    existingPerson.address = json.address;
                    existingPerson.image = json.image;
                    existingPerson.dob = json.dob;
          
                    const updatedPerson = await existingPerson.save();
                    updatedPersons.push(updatedPerson);
                  } else {
                    // Create a new person
                    const newPerson = new Person(json);
                    const savedPerson = await newPerson.save();
                    updatedPersons.push(savedPerson);
                  }
            }
            res.status(200).json({
                message: 'CSV file imported successfully',
                data: updatedPersons
              });
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = PersonController