
var express = require('express');
var router = express.Router();
/** Declaration */
const dashboardController = require('../controller/dashboardController');
const destinationController = require('../controller/destinationController');
const aboutController = require('../controller/aboutController');
const airlineController = require('../controller/airlineController');
const promoController = require('../controller/promoController');
const promotionController = require('../controller/promotionController');
const testimonialController = require('../controller/testimonialController');
const userController = require('../controller/userController');
const flightController = require('../controller/flightController');
const bannerHomeController = require('../controller/bannerHomeController');
const bannerDestinationController = require('../controller/bannerDestinationController');
const bannerAboutController = require('../controller/bannerAboutController');
const bannerOrderController = require('../controller/bannerOrderController');
const bannerAirlineController = require('../controller/bannerAirlineController');
const bannerSupportController = require('../controller/bannerSupportController');
const paymentController = require('../controller/paymentController');
const paymentMethodController = require('../controller/paymentMethodController');
const airportController = require('../controller/airportListController');
const flightScheduleController = require('../controller/flightScheduleController');
const reservationController = require('../controller/reservationController');
const { upload } = require('../middlewares/multer');
const { checkLogin } = require('../middlewares/auth');
const { 
        validateDestination, 
        validateAirline, 
        validateHomeBanner, 
        validateDestinationBanner, 
        validateAboutBanner,
        validateOrderBanner, 
        validateAbout,
        validateTestimonial,
        validatePaymentMethod,
        validatePromotion,
        validateAirlineBanner,
        validateSupportBanner,
        validateFlight

        
    } = require('../middlewares/validation');

/** Register ====================================================================== */
router.get('/register', userController.register);
router.post('/auth-register', userController.postRegister);

// /** Login ====================================================================== */
router.get('/', userController.login);
router.post('/auth-login', userController.authLogin);
router.use(checkLogin);
/** Dashboard ====================================================================== */
router.get('/dashboard', dashboardController.index);
/** Destination ====================================================================== */
router.get('/destination', destinationController.index);
router.post('/create-destination', upload.single('image'), validateDestination, destinationController.store);
router.put('/update-destination', upload.single('image'), validateDestination, destinationController.update);
router.delete('/delete-destination/:id', destinationController.delete);
router.get('/search-destination', destinationController.search);
/** About ====================================================================== */
router.get('/about', aboutController.index);
router.post('/create-about',upload.fields([{ name: 'imageHistory', maxCount: 1 },{ name: 'image', maxCount: 1 }]), validateAbout, aboutController.store);
router.put('/update-about', upload.fields([{ name: 'imageHistory', maxCount: 1 },{ name: 'image', maxCount: 1 }]), aboutController.update);
router.delete('/delete-about/:id', aboutController.delete);
/** Airline ====================================================================== */
router.get('/airline', airlineController.index);
router.post('/create-airline', upload.single('image'), validateAirline, airlineController.store);
router.put('/update-airline', upload.single('image'), validateAirline, airlineController.update);
router.delete('/delete-airline/:id', airlineController.delete);
/** Promo ====================================================================== */
router.get('/promo', promoController.index);
router.post('/create-promo',upload.array('image', 2), promoController.store);
router.put('/update-promo',upload.array('image', 2), promoController.update);
router.delete('/delete-promo/:id', promoController.delete);

router.get('/promotion', promotionController.index);
router.post('/create-promotion',upload.single('image'), validatePromotion, promotionController.store);
router.put('/update-promotion', upload.single('image'), validatePromotion, promotionController.update);
router.delete('/delete-promotion/:id', promotionController.delete);
/** Testimonial ====================================================================== */
router.get('/testimonial', testimonialController.index);
router.post('/create-testimonial', upload.single('image'), validateTestimonial, testimonialController.store);
router.put('/update-testimonial', upload.single('image'), validateTestimonial, testimonialController.update);
router.delete('/delete-testimonial/:id', testimonialController.delete);
/** User ====================================================================== */
router.get('/user', userController.index);
router.put('/update-user', userController.update);
router.delete('/delete-user/:id', userController.delete);
router.get('/search-user', userController.search);
/** Banner Home ====================================================================== */
router.get('/home-banner', bannerHomeController.index);
router.post('/create-home-banner', upload.single('image'),validateHomeBanner, bannerHomeController.store);
router.put('/update-home-banner', upload.single('image'),validateHomeBanner, bannerHomeController.update);
router.delete('/delete-home-banner/:id', bannerHomeController.delete);
/** Banner Destination ====================================================================== */
router.get('/destination-banner', bannerDestinationController.index);
router.post('/create-destination-banner', upload.single('image'),validateDestinationBanner, bannerDestinationController.store);
router.put('/update-destination-banner', upload.single('image'),validateDestinationBanner, bannerDestinationController.update);
router.delete('/delete-destination-banner/:id', bannerDestinationController.delete);
// /** Banner About ====================================================================== */
router.get('/about-banner', bannerAboutController.index);
router.post('/create-about-banner', upload.single('image'),validateAboutBanner, bannerAboutController.store);
router.put('/update-about-banner', upload.single('image'),validateAboutBanner, bannerAboutController.update);
router.delete('/delete-about-banner/:id', bannerAboutController.delete);
// /** Banner Order ====================================================================== */
router.get('/order-banner', bannerOrderController.index);
router.post('/create-order-banner', upload.single('image'),validateOrderBanner, bannerOrderController.store);
router.put('/update-order-banner', upload.single('image'),validateOrderBanner, bannerOrderController.update);
router.delete('/delete-order-banner/:id', bannerOrderController.delete);
// /** Banner Airline ====================================================================== */
router.get('/airline-banner', bannerAirlineController.index);
router.post('/create-airline-banner', upload.single('image'),validateAirlineBanner, bannerAirlineController.store);
router.put('/update-airline-banner', upload.single('image'),validateAirlineBanner, bannerAirlineController.update);
router.delete('/delete-airline-banner/:id', bannerAirlineController.delete);
// /** Banner Support ====================================================================== */
router.get('/support-banner', bannerSupportController.index);
router.post('/create-support-banner', upload.single('image'),validateSupportBanner, bannerSupportController.store);
router.put('/update-support-banner', upload.single('image'),validateSupportBanner, bannerSupportController.update);
router.delete('/delete-support-banner/:id', bannerSupportController.delete);
/** Flight ====================================================================== */
router.get('/flight', flightController.index);
router.post('/create-flight',upload.single('icon'), validateFlight, flightController.store);
router.put('/update-flight', upload.single('icon'), flightController.update);
router.delete('/delete-flight/:id', flightController.delete);
router.get('/search-flight', flightController.search);
/** Payment ====================================================================== */
router.get('/payment-method', paymentMethodController.index);
router.post('/create-payment-method', upload.single('logo'), validatePaymentMethod, paymentMethodController.store);
router.put('/update-payment-method', upload.single('logo'),validatePaymentMethod, paymentMethodController.update);
router.delete('/delete-payment-method/:id', paymentMethodController.delete);
/** Airport ====================================================================== */
router.get('/airport', airportController.index);
router.post('/create-airport', airportController.store);
router.put('/update-airport', airportController.update);
router.delete('/delete-airport/:id', airportController.delete);
// /** Flight Schedule ====================================================================== */
router.get('/flight-schedule', flightScheduleController.index);
router.post('/create-flight-schedule',upload.single('icon'), flightScheduleController.store);
router.put('/update-flight-schedule', upload.single('icon'), flightScheduleController.update);
router.delete('/delete-flight-schedule/:id', flightScheduleController.delete);
router.get('/search-flight-schedule', flightScheduleController.search);
router.delete('/delete-airport/:id', airportController.delete);
// /** Reservation ====================================================================== */
router.get('/reservation', reservationController.index);
// router.get('/search-reservation', reservationController.search);

// /** Payment ====================================================================== */
router.get('/payment', paymentController.index);
// router.get('/search-payment', paymentController.search);
router.put('/update-payment', paymentController.update);
/** Logout ====================================================================== */
router.get('/logout', userController.logout);

module.exports = router;