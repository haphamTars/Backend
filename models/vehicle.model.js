const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const VehicleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    personal_id: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

VehicleSchema.plugin(mongoosePaginate);

module.exports = Home = mongoose.model('Vehicle', VehicleSchema);