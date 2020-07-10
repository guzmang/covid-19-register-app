const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let personSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    dna: {
        type: Array,
        required: [true, 'DNA is required']
    },
    result: {
        type: String,
        required: [true, 'Result is required']
    },
});

module.exports = mongoose.model('Person', personSchema);