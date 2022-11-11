const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    products: [{
        type: String,
        required: true
    }],
});

module.exports = mongoose.model('Kit', kitSchema);