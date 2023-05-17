const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const TagSchema = new Schema({
    isActive: {
        type: Boolean
    },
    tagSerial: {
        type: String
    }
}, {
    timestamps: true,
});

TagSchema.plugin(mongoosePaginate);

module.exports = Tag = mongoose.model('Tag', TagSchema);