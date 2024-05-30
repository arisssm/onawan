const Payment = require('../models/payment');

module.exports = {
    index: async (req, res) => {
        try {
            const payment = await Payment.find()
            .populate({
                path: 'reservationId',
                populate: [
                    { 
                        path: 'flightId', model: 'flightSchedule'
                    }
                ]
            })
            .populate('paymentMethodId');
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Payment';
            res.locals.onPage = 'payment';
            res.render('pages/payment', {alert, payment, userSession});
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    update: async (req, res) => {
        try {
            const { id, reservationId, paymentMethodId, deadline, status} = req.body;
            const payment = await Payment.findOne({_id:id});
            // if (!payment) {
            //     req.flash('alertMsg','Failed, data not found');
            //     req.flash('alertStatus', 'danger');
            //     res.redirect('/admin/payment');
            // }
            payment.reservationId = reservationId;
            payment.paymentMethodId = paymentMethodId;
            payment.deadline = deadline;
            payment.status = status;

            await payment.save();

            req.flash('alertMsg','Success, payment has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/payment');
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/payment');
        }
    }
}