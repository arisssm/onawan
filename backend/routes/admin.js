
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
const bannerController = require('../controller/bannerController');
const { upload } = require('../middlewares/multer');
const { validateDestination } = require('../middlewares/validation');

/** Dashboard */
router.get('/', dashboardController.index);
/** Destination */
router.get('/destination', destinationController.index);
router.post('/create-destination', upload.single('image'), validateDestination, destinationController.store);
router.put('/update-destination', upload.single('image'), validateDestination, destinationController.update);
router.delete('/delete-destination/:id', destinationController.delete);
/** About */
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
/** Airline */
router.get('/airline', airlineController.index);
// router.post('/create-airline', airlineController.store);
// router.put('/update-airline', airlineController.update);
// router.delete('/delete-airline/:id', airlineController.delete);
/** Promo */
router.get('/promo', promoController.index);
// router.post('/create-promo', promoController.store);
// router.put('/update-promo', promoController.update);
// router.delete('/delete-promo/:id', promoController.delete);
/** Testimonial */
router.get('/testimonial', testimonialController.index);
// router.post('/create-testimonial', testimonialController.store);
// router.put('/update-testimonial', testimonialController.update);
// router.delete('/delete-testimonial/:id', testimonialController.delete);
/** User */
router.get('/user', userController.index);
// router.post('/create-user', userController.store);
// router.put('/update-user', userController.update);
// router.delete('/delete-user/:id', userController.delete);
/** Banner */
router.get('/banner', bannerController.index);
// router.post('/create-banner', bannerController.store);
// router.put('/update-banner', bannerController.update);
// router.delete('/delete-banner/:id', bannerController.delete);

module.exports = router;