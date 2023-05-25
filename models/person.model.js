const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        require: true
    },
}, {
    timestamps: true,
});

PersonSchema.plugin(mongoosePaginate);

module.exports = Home = mongoose.model('Person', PersonSchema);