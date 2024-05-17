const User = require('../models/user');
module.exports = {
    index: async (req, res) => {
        try {
            const user = await User.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            const userSession = req.session.user;
            console.log(userSession);
            res.locals.title = 'Onawan | Dashboard';
            res.locals.onPage = 'dashboard';
            res.render('pages/dashboard', {alert, user, userSession});
        } catch(error) {
            console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    }
}