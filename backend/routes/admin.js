
var express = require('express');
var router = express.Router();
// variabel untuk menampung controller
const dashboardController = require('../controller/dashboardController');
const destinationController = require('../controller/destinationController');
// definisikan route dgn method untuk mengakses variabel controller dan fungsi
router.get('/', dashboardController.index);
//  Destination
router.get('/destination', destinationController.index);
router.post('/create-destination', destinationController.store);
module.exports = router;