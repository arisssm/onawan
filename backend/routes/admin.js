
var express = require('express');
var router = express.Router();
/** Declaration */
const dashboardController = require('../controller/dashboardController');
const destinationController = require('../controller/destinationController');
const aboutController = require('../controller/aboutController');
const airlineController = require('../controller/airlineController');
const promoController = require('../controller/promoController');
const testimonialController = require('../controller/testimonialController');
const userController = require('../controller/userController');
const flightController = require('../controller/flightController');
const bannerHomeController = require('../controller/bannerHomeController');
const bannerDestinationController = require('../controller/bannerDestinationController');
const bannerAboutController = require('../controller/bannerAboutController');
const { upload } = require('../middlewares/multer');
const { 
        validateDestination, 
        validateAirline, 
        validateHomeBanner, 
        validateDestinationBanner, 
        validateAboutBanner, 
        validateTestimonial,
        validateFlight
    } = require('../middlewares/validation');

/** Dashboard ====================================================================== */
router.get('/', dashboardController.index);
/** Destination ====================================================================== */
router.get('/destination', destinationController.index);
router.post('/create-destination', upload.single('image'), validateDestination, destinationController.store);
router.put('/update-destination', upload.single('image'), validateDestination, destinationController.update);
router.delete('/delete-destination/:id', destinationController.delete);
/** About ====================================================================== */
router.get('/about', aboutController.index);
router.post('/create-about',upload.fields([
    { name: 'imageHistory' },
    { name: 'image' },
    { name: 'bannerSupport' }
]), aboutController.store);
router.put('/update-about', upload.fields([
    { name: 'imageHistory' },
    { name: 'image' },
    { name: 'bannerSupport' }
]), aboutController.update);
router.delete('/delete-about/:id', aboutController.delete);
/** Airline ====================================================================== */
router.get('/airline', airlineController.index);
router.post('/create-airline', upload.single('image'), validateAirline, airlineController.store);
router.put('/update-airline', upload.single('image'), validateAirline, airlineController.update);
router.delete('/delete-airline/:id', airlineController.delete);
/** Promo ====================================================================== */
router.get('/promo', promoController.index);
// router.post('/create-promo', promoController.store);
// router.put('/update-promo', promoController.update);
// router.delete('/delete-promo/:id', promoController.delete);
/** Testimonial ====================================================================== */
router.get('/testimonial', testimonialController.index);
router.post('/create-testimonial', upload.single('image'), validateTestimonial, testimonialController.store);
router.put('/update-testimonial', upload.single('image'), validateTestimonial, testimonialController.update);
router.delete('/delete-testimonial/:id', testimonialController.delete);
/** User ====================================================================== */
router.get('/user', userController.index);
// router.post('/create-user', userController.store);
// router.put('/update-user', userController.update);
// router.delete('/delete-user/:id', userController.delete);
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
/** Flight ====================================================================== */
router.get('/flight', flightController.index);
router.post('/create-flight',upload.single('icon'), flightController.store);
// router.put('/update-flight', flightController.update);
router.delete('/delete-flight/:id', flightController.delete);
router.get('/search-flight', flightController.search);

module.exports = router;