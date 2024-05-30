const Reservation = require('../models/reservation');

module.exports = {
    index: async (req, res) => {
        try {
            const reservation = await Reservation.find()
            .populate('userId')
            .populate({
                path: 'flightId',
                populate: [
                    { path: 'departureAirportId', model: 'airportList' },
                    { path: 'arrivalAirportId', model: 'airportList' },
                    { path: 'airlineId', model: 'airline' }
                ]
            });
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Reservation';
            res.locals.onPage = 'reservation';
            res.render('pages/reservation', {alert, reservation, userSession});
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
}