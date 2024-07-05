var express = require('express');
var router = express.Router();

const apiController = require('../controller/apiController');
const { authJWT } = require('../middlewares/auth');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

router.post('/register', apiController.registerUser);
router.post('/login', apiController.loginUser);

/**====================================================================== */
router.get('/destination', apiController.indexDestination);
/**====================================================================== */
router.get('/airline', apiController.indexAirline);
/**====================================================================== */
router.get('/about', apiController.indexAbout);
/**====================================================================== */
router.get('/home-banner', apiController.indexHomeBanner);
/**====================================================================== */
router.get('/about-banner', apiController.indexAboutBanner);
/**====================================================================== */
router.get('/order-banner', apiController.indexOrderBanner);
/**====================================================================== */
router.get('/destination-banner', apiController.indexDestinationBanner);
/**====================================================================== */
router.get('/support-banner', apiController.indexSupportBanner);
/**====================================================================== */
router.get('/airline-banner', apiController.indexAirlineBanner);
/**====================================================================== */
router.get('/promo', apiController.indexPromo);
/**====================================================================== */
router.get('/promotion', apiController.indexPromotion);
/**====================================================================== */
router.get('/testimonial', apiController.indexTestimonial);
/**====================================================================== */
router.get('/flight-schedule', apiController.indexFlightSchedule);
router.get('/search-flight', apiController.searchFlight);
/**====================================================================== */
router.get('/airport', apiController.indexAirport);
/**====================================================================== */
router.get('/payment-method',authJWT, apiController.indexPaymentMethod);
/**====================================================================== */
router.get('/user', apiController.indexUser);
router.put('/update-user', authJWT, apiController.updateUser);
/**====================================================================== */
router.post('/post-reservation', authJWT, apiController.postReservation);
router.get('/reservation', apiController.indexReservation);
router.get('/reservation/:id', apiController.showReservation);
/**====================================================================== */
router.post('/post-payment',authJWT, apiController.postPayment);
router.get('/payment',authJWT, apiController.indexPayment);
router.get('/payment/:id',authJWT, apiController.showPayment);
/**====================================================================== */
module.exports = router;