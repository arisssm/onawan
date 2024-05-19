const FlightSchedule = require('../models/flightSchedule');
const AirportList = require('../models/airportList');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const flightSchedule = await FlightSchedule.find()
            .populate('departureAirportId')
            .populate('arrivalAirportId');
            const airports = await AirportList.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Flight Schedule';
            res.locals.onPage = 'flightschedule';
            res.render('pages/flightSchedule', { 
                flightSchedule,
                airports, 
                alert,
                userSession 
            });
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const { 
                airlineName, 
                departureTime, 
                arrivalTime, 
                duration, 
                flightClass, 
                capacity, 
                price, 
                flightNumber, 
                flightType, 
                departureAirportId, 
                arrivalAirportId 
            } = req.body;
            // console.log(req.body);
            // console.log(req.file);
            const flight = new FlightSchedule({
                airlineName,
                icon: req.file.filename,
                departureTime,
                arrivalTime,
                duration,
                flightClass,
                capacity,
                price,
                flightNumber,
                flightType,
                departureAirportId,
                arrivalAirportId
            });
            await flight.save();
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/flight-schedule');
            
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/flight-schedule');
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const flightSchedule = await FlightSchedule.findById(id);
            if (!flightSchedule) {
                req.flash('alertMsg', 'Flight schedule not found');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin/flight-schedule');
            }
            await FlightSchedule.findByIdAndDelete(id);
            if (flightSchedule.icon) {
                const imagePath = path.join(__dirname, '../public/images', flightSchedule.icon);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
    
            req.flash('alertMsg', 'Warning, flight schedule has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/flight-schedule');
        } catch (error) {
            console.error(error);
            req.flash('alertMsg', 'Failed, error code : ' + error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/flight-schedule');
        }
    },
    search: async (req, res) => {
        try{
            const userSession = req.session.user;
            const searchDocument = req.query.document || '';
            const regex = new RegExp(searchDocument, 'i');
            let flightSchedule;
            if (searchDocument){
                flightSchedule = await FlightSchedule.find({airlineName: regex}).populate('departureAirportId').populate('arrivalAirportId');
            } else {
                flightSchedule = await FlightSchedule.find({}).populate('departureAirportId').populate('arrivalAirportId');
            }
            const airports = await AirportList.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Flight Schedule';
            res.locals.onPage = 'flight Schedule';
            res.render('pages/flightSchedule', { flightSchedule, airports, alert, userSession });
        } catch(error) {
            console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/flight-schedule');
        }
    },
    update: async (req, res) => {
        try {
            const {
                id,
                airlineName,
                departureTime,
                arrivalTime,
                duration,
                flightClass,
                capacity,
                price,
                flightNumber,
                flightType,
                departureAirportId,
                arrivalAirportId
            } = req.body;
    
            const flightSchedule = await FlightSchedule.findOne({_id : id});
    
            if (!flightSchedule) {
                req.flash('alertMsg', 'Flight schedule not found');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin/flight-schedule');
            }
    
            let icon = flightSchedule.icon;
            if (req.file) {
                if (icon) {
                    const iconPath = path.join(__dirname, '../public/images', icon);
                    if (fs.existsSync(iconPath)) {
                        fs.unlinkSync(iconPath);
                    }
                }
                icon = req.file.filename;
            }
    
            flightSchedule.airlineName = airlineName;
            flightSchedule.departureTime = departureTime;
            flightSchedule.arrivalTime = arrivalTime;
            flightSchedule.duration = duration;
            flightSchedule.flightClass = flightClass;
            flightSchedule.capacity = capacity;
            flightSchedule.price = price;
            flightSchedule.flightNumber = flightNumber;
            flightSchedule.flightType = flightType;
            flightSchedule.departureAirportId = departureAirportId;
            flightSchedule.arrivalAirportId = arrivalAirportId;
            flightSchedule.icon = icon;
    
            await flightSchedule.save();
    
            req.flash('alertMsg', 'Success, flight schedule has been updated');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/flight-schedule');
        } catch (error) {
            console.error(error);
            req.flash('alertMsg', 'Failed to updated, error : ' + error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/flight-schedule');
        }
    }
}