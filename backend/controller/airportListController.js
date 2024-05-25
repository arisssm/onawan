const AirportList = require ('../models/airportList');

module.exports = {
    index: async (req, res) => {
        try {
            const airports = await AirportList.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Airport List';
            res.locals.onPage = 'airportlist';
            res.render('pages/airportList', {alert, airports, userSession});
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const { city, code, airport, category } = req.body;
            // console.log(req.body);
            const newAirport = new AirportList({
                city,
                code,
                airport,
                category
            });
            await newAirport.save();
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/airport');
        } catch (error) {
            console.error(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/airport');
        }
    },
    update: async (req, res ) => {
        try {
            const { id, city, code, airport, category } = req.body;
            const dataAirport = await AirportList.findOne({_id: id});
            if (!dataAirport) {
                req.flash('alertMsg', 'Failed, data not found');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin/airport');
            }
            dataAirport.city = city;
            dataAirport.code = code;
            dataAirport.airport = airport;
            dataAirport.category = category;

            await dataAirport.save();
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/airport');
        } catch(error){
            console.error(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/airport');
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await AirportList.findOneAndDelete({_id: id});
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/airport');
        } catch {
            console.log(error);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/airport');
        }
    }
}