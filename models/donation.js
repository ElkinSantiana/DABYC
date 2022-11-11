const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const donationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    kit: {
        type: String,
        required: true
    },
    products: {
        type: [ProductSchema],
        required: true
    },
    message: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Donation', donationSchema);