const express = require('express');
const router = express.Router();
const BusController = require('../controllers/BusController');

router.get('/', BusController.homePage);
router.post('/search', BusController.searchBuses);
router.post('/book', BusController.bookBus);
router.post('/payment', BusController.paymentPage);
router.post('/confirm-booking', BusController.confirmBooking);
router.get('/my-bookings', BusController.myBookings);

module.exports = router;
