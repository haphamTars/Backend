const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ViolationSchema = new Schema({
    time: {
        type: Date,
        require: true
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }
}, {
    timestamps: true,
});

ViolationSchema.plugin(mongoosePaginate);

module.exports = Home = mongoose.model('Violation', ViolationSchema);