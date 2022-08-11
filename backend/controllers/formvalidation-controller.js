const luhn = require('luhn');

const Validation = require('../models/validate');
const { validationResult } = require('express-validator')

const createPayment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    const createdPayment = new Validation({
        email: req.body.email,
        cardNumber: luhn.validate(req.body.cardNumber),
        expirationDate: req.body.expirationDate,
        cvv: req.body.cvv,
        name: req.body.name
    });
    try {
        await createdPayment.save();
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'Creating Payment Failed' })
    };
    return res.status(201).json({ todo: createdPayment });
};

//get all Payments
const getAllPayments = async(req, res, next) => {
    const payments = await Validation.find().exec();
    return res.status(200).json(payments)
}




exports.createPayment = createPayment;
exports.getAllPayments = getAllPayments;