const {body, validationResult} = require('express-validator');
const documentDestination = require('../models/destination');


exports.validateCreateDestination = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 5, max: 20}).withMessage('Name must be between 5 and 20 characters')
    .custom((value) => {
        return documentDestination.find({ name: value }).then(destination => {
            if (destination.length > 0) {
                throw new Error("Destination name is taken!");
            }
        });
    }),
    body('location')
    .notEmpty().withMessage('Location is required')
    .isLength({ min: 4, max: 20}).withMessage('Name must be between 5 and 20 characters'),

    body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a numeric')
    .custom((value) => {
        if (value < 100000 || value > 5000000) {
            throw new Error('Price must be between 100.000 IDR until 5.000.000 IDR');
        }
        return true;
    }),
    body('image')
    .notEmpty().withMessage('Image is required'),
    body('isRecommendation')
    .notEmpty().withMessage('Recommendation is required')
    .isBoolean().withMessage('Recommendation must be selected'),
    body('idnRecommendation')
    .notEmpty().withMessage('idn Recommendation is required')
    .isBoolean().withMessage('Indonesia Recommendation must be selected'),
    body('interRecommendation')
    .notEmpty().withMessage('inter Recommendation is required')
    .isBoolean().withMessage('International Recommendation must be selected'),
    // handling error validation
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        } else {
            return res.json({ success: 'Validation successful. Data is correct.' });
        }
    }
]