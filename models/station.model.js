const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const StationSchema = new Schema({
    serial: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

StationSchema.plugin(mongoosePaginate);

module.exports = Home = mongoose.model('Station', StationSchema);