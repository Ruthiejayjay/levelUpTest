const mongoose = require('mongoose');

const validateSchema = new mongoose.Schema({
    email: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cardMonth: { type: String, required: true, },
    cardYear: { type: String, required: true, },
    cardCvv: { type: Number, required: true, },
    cardName: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Validation', validateSchema);