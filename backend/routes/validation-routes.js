const express = require('express');
const { check } = require('express-validator');

const formValidation = require('../controllers/formvalidation-controller');

const router = express.Router();

const luhnCheck = require('../models/checkValidations').luhnCheck;
const expiryDateCheck = require('../models/checkValidations').expiryDateCheck;
const cvvCheck = require('../models/checkValidations').cvvCheck; 

router.post('/', [
    check('email', 'Invalid email')
        .normalizeEmail()
        .isEmail(),
    check('name', 'Invalid name')
        .not()
        .isEmpty(),
    check('cvv', 'Invalid cvv')
        .isLength({ min: 3, max: 4 })
        .custom((cvv, {req}) => {
            return cvvCheck(cvv, req.body.cardNumber)
        }),
    check('cardNumber', 'Invalid card number')
        .isLength({ min: 16, max: 19 })
        .custom((cardNumber) => {
            return luhnCheck(cardNumber)
        }),
    check('month', 'Invalid expiry date')
        .isLength({ min: 2, max: 2 })
        .custom((month, { req })=> {
            return expiryDateCheck(month, req.body.year)
        }),
    check('year', 'Invalid expiry date')
        .isLength({ min: 4, max: 4 }),


], formValidation.createPayment);

router.get('/', formValidation.getAllPayments);

module.exports = router;