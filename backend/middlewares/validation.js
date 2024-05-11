const {body, validationResult} = require('express-validator');
// const documentDestination = require('../models/destination');


exports.validateDestination = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min:4, max:20}).withMessage('Name must be between 5 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must only contain letters and spaces'),
    // .custom((value) => {
    //     return documentDestination.find({ name: value }).then(destination => {
    //         if (destination.length > 0) {
    //             throw new Error("Destination name is taken!");
    //         }
    //     });
    // }),
    body('location')
    .notEmpty().withMessage('Location is required')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name location must only contain letters and spaces')
    .isLength({ min: 4, max: 20}).withMessage('Name location must be between 5 until 20 characters'),

    body('price')
    .notEmpty().withMessage('Price is required') 
    .isNumeric().withMessage('Price must be a numeric')
    .custom((value) => {
        if (value < 100000 || value > 5000000) {
            throw new Error('Price must be between 100.000 IDR until 5.000.000 IDR');
        }
        return true;
    }),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateAirline = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min:4, max:20}).withMessage('Name must be between 5 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must only contain letters and spaces'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateHomeBanner = [
    body('headline')
    .notEmpty().withMessage('Headline is required')
    .isLength({ min:4, max:100}).withMessage('Headline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Headline must only contain letters and spaces'),
    body('subHeadline')
    .notEmpty().withMessage('subHeadline is required')
    .isLength({ min:4, max:100}).withMessage('subHeadline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('subHeadline must only contain letters and spaces'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateDestinationBanner = [
    body('headline')
    .notEmpty().withMessage('Headline is required')
    .isLength({ min:4, max:100}).withMessage('Headline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Headline must only contain letters and spaces'),
    body('subHeadline')
    .notEmpty().withMessage('subHeadline is required')
    .isLength({ min:4, max:100}).withMessage('subHeadline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('subHeadline must only contain letters and spaces'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateAboutBanner = [
    body('headline')
    .notEmpty().withMessage('Headline is required')
    .isLength({ min:4, max:100}).withMessage('Headline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Headline must only contain letters and spaces'),
    body('subHeadline')
    .notEmpty().withMessage('subHeadline is required')
    .isLength({ min:4, max:100}).withMessage('subHeadline must be between 5 until 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('subHeadline must only contain letters and spaces'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];
exports.validateOrderBanner = [
    body('headline')
    .notEmpty().withMessage('Headline is required')
    .isLength({ min:4, max:100}).withMessage('Headline must be between 5 until 100 characters'),
    // .matches(/^[a-zA-Z\s]+$/).withMessage('Headline must only contain letters and spaces'),
    body('subHeadline')
    .notEmpty().withMessage('subHeadline is required')
    .isLength({ min:4, max:100}).withMessage('subHeadline must be between 5 until 100 characters'),
    // .matches(/^[a-zA-Z\s]+$/).withMessage('subHeadline must only contain letters and spaces'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateTestimonial = [
    body('fullname')
    .notEmpty().withMessage('Full name is required')
    .isLength({ min:4, max:20}).withMessage('Full name must be between 5 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name must only contain letters and spaces'),
    body('content')
    .notEmpty().withMessage('Content is required'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    body('status')
    .notEmpty().withMessage('Status must be selected'),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];
exports.validatePaymentMethod = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min:3, max:20}).withMessage('Name must be between 3 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must only contain letters and spaces'),
    body('accountNumber')
    .notEmpty().withMessage('Content is required')
    .isNumeric().withMessage('Account Number must be a numeric'),
    // body('logo').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    body('accountHolder')
    .notEmpty().withMessage('Account holder is required')
    .isLength({ min:4, max:20}).withMessage('Name must be between 4 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must only contain letters and spaces'),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateFlight = [
    body('airlineName')
    .notEmpty().withMessage('Airline name is required')
    .isLength({ min:4, max:20}).withMessage('Airline name must be between 5 until 20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Airline name must only contain letters and spaces'),
    body('departureTime')
    .notEmpty().withMessage('Departure time is required')
    .custom((value, { req }) => {
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate <= today) {
            throw new Error('Departure time can not last time');
        }
        return true;
    }),
    body('arrivalTime')
    .notEmpty().withMessage('Arrival time is required')
    .custom((value, { req }) => {
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate <= today) {
            throw new Error('Arrival time can not last time');
        }
        return true;
    }),
    body('price')
    .notEmpty().withMessage('Price is required') 
    .isNumeric().withMessage('Price must be a numeric')
    .custom((value) => {
        if (value < 100000 || value > 5000000) {
            throw new Error('Price must be between 100.000 IDR until 5.000.000 IDR');
        }
        return true;
    }),
    // body('icon').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Icon is required');
    //     }
    //     return true;
    // }),
    body('duration')
    .notEmpty().withMessage('Duration is required'),
    body('capacity')
    .notEmpty().withMessage('Capacity is required'),
    body('flightNumber')
    .notEmpty().withMessage('Flight Number is required')
    .isLength({ min:5, max:6}).withMessage('Flight Number must be between 5 until 6 characters'),
    body('flightClass')
    .notEmpty().withMessage('Flight class must be selected'),
    body('flightType')
    .notEmpty().withMessage('Flight type must be selected'),
    body('departure_city')
    .notEmpty().withMessage('Departure City is required'),
    body('departure_cityCode')
    .notEmpty().withMessage('Departure city code is required'),
    body('departure_airport')
    .notEmpty().withMessage('Departure airport is required'),
    body('arrival_city')
    .notEmpty().withMessage('Departure City is required'),
    body('arrival_cityCode')
    .notEmpty().withMessage('Departure city code is required'),
    body('arrival_airport')
    .notEmpty().withMessage('Departure airport is required'),
    
    // handling error validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        next();
    }
];
