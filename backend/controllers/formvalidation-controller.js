
const Validation = require('../models/validate');
const { validationResult } = require('express-validator')

const createPayment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    const createdPayment = new Validation({
        email: req.body.email,
        cardNumber: req.body.cardNumber,
        cardMonth: req.body.month,
        cardYear: req.body.year,
        cardCvv: req.body.cvv,
        cardName: req.body.name
    });

    try {
        await createdPayment.save();
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'Creating Payment Failed' })
    }

    return res.status(201).json({ Payment: createdPayment });
};

//get all Payments
const getAllPayments = async (req, res, next) => {
    const payments = await Validation.find().exec();
    return res.status(200).json(payments)
}




exports.createPayment = createPayment;
exports.getAllPayments = getAllPayments;