
var express = require('express');
var router = express.Router();
// variabel untuk menampung controller
const dashboardController = require('../controller/dashboardController');
const destinationController = require('../controller/destinationController');
// definisikan route dgn method untuk mengakses variabel controller dan fungsi
router.get('/', dashboardController.index);
//  Destination
router.get('/destination', destinationController.index);
router.post('/c-destination', destinationController.store);
router.put('/update-destination', destinationController.update);
router.delete('/delete-destination/:id', destinationController.delete);

module.exports = router;