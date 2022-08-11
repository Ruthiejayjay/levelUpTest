const express = require('express');
const { check } = require('express-validator');

const formValidation = require('../controllers/formvalidation-controller');

const router = express.Router();

router.post('/', [
    check('email', 'Email must be a valid Email')
        .normalizeEmail()
        .isEmail(),
    check('name', 'Name must not be empty')
        .not()
        .isEmpty(),
    check('cvv', 'This cvv must be 3characters long')
        .isLength({ min: 3, max: 3 }),
    check('cardNumber', 'Card Number must be between 16 to 19 characters long' )
        .isLength({ min: 16, max: 19}),
    check("expirationDate", 'Must be after Current Date')
        .isDate({format: 'MM/DD/YYYY'})
        .isAfter()
        
    
], formValidation.createPayment);

router.get('/', formValidation.getAllPayments);

module.exports = router;