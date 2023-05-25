const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const VehicleSchema = new Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    type: {
        type: String,
        require: true
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    serial: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

VehicleSchema.plugin(mongoosePaginate);

module.exports = Vehicle = mongoose.model('Vehicle', VehicleSchema);