const mongoose = require('mongoose');

const validateSchema = new mongoose.Schema({
    email: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    expirationDate: { type: Date, required: true,  },
    cvv: { type: Number, required: true, },
    name: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Validation', validateSchema);