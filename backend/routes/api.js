var express = require('express');
var router = express.Router();

const apiController = require('../controller/apiController');

router.get('/destination', apiController.indexDestination);
router.get('/airline', apiController.indexAirline);
router.get('/about', apiController.indexAbout);
router.get('/home-banner', apiController.indexHomeBanner);
router.get('/about-banner', apiController.indexAboutBanner);
router.get('/order-banner', apiController.indexOrderBanner);
router.get('/destination-banner', apiController.indexDestinationBanner);
router.get('/promo', apiController.indexPromo);
router.get('/testimonial', apiController.indexTestimonial);
router.get('/flight', apiController.indexFlight);
router.get('/payment-method', apiController.indexPaymentMethod);
router.get('/user', apiController.indexUser);
router.put('/update-user', apiController.updateUser);
module.exports = router;