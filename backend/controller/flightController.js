const Flight = require('../models/flight');
const Airport = require('../models/airport');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const flight = await Flight.find().populate('airportId');
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Flight';
            res.locals.onPage = 'flight';
            res.render('pages/flight', { flight, alert });
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    store: async (req, res) => {
        try {
            const { 
                airlineName, 
                departureTime, 
                arrivalTime,
                duration,
                capacity,
                price,
                flightNumber,
                flightClass,
                flightType,
                departure_city,
                departure_cityCode,
                departure_airport,
                arrival_city,
                arrival_cityCode,
                arrival_airport

            } = req.body;

            console.log(req.body);
            console.log(req.file);
            
            let departureAirport = await Airport.create({
                city : departure_city,
                code : departure_cityCode,
                airport : departure_airport,
                category : 'departure'
            });

            let arrivalAirport = await Airport.create({
                city : arrival_city,
                code : arrival_cityCode,
                airport : arrival_airport,
                category : 'arrival'
            });

            let newData = await Flight.create({
                airlineName, 
                icon: req.file.filename, 
                departureTime, 
                arrivalTime,
                duration,
                capacity,
                price,
                flightNumber,
                flightClass,
                flightType,
            });

            newData.airportId.push({ _id: departureAirport.id });
            newData.airportId.push({ _id: arrivalAirport.id });
            await newData.save();
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/flight');
            
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/flight');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const flight = await Flight.findById(id);
            const airport_id = flight.airportId.map(airport => airport._id);
            await Flight.deleteOne({ _id: id });
            await Airport.deleteMany({ _id: { $in: airport_id } });

            if (flight && flight.icon) {
                const imagePath = path.join(__dirname, '../public/images', flight.icon);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/flight');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/flight');
        }
    }
}