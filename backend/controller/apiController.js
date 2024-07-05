const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const About = require('../models/about');
const Airline = require('../models/airline');
const AirportList = require ('../models/airportList');
const BannerAbout = require ('../models/aboutBanner');
const BannerAirline = require ('../models/airlineBanner');
const BannerDestination = require ('../models/destinationBanner');
const BannerHome = require ('../models/homeBanner');
const BannerOrder = require ('../models/orderBanner');
const BannerSupport = require ('../models/supportBanner');
const Destination = require ('../models/destination');
const FlightSchedule = require ('../models/flightSchedule');
const Payment = require ('../models/payment');
const PaymentMethod = require ('../models/paymentMethod');
const Promo = require ('../models/promo');
const Promotion = require ('../models/promotion');
const Reservation = require ('../models/reservation');
const Testimonial = require ('../models/testimonial');
const User = require ('../models/user');


module.exports = {
    registerUser: async (req, res) => {
        try {
            const { fullname, email, phone, password } = req.body;
            const user = await User.create({
                fullname, email, phone, password, role: 'Customer'
            });
            res.status(200).json({
                message: 'Success, your account has been registered!', 
                user
            });
        } catch(error){
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email: email});
            if(!user){
                res.status(400).json({message:'User email not found!'})
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                res.status(400).json({message:'User password not found!'})
            }
            if ( user.role != 'Customer'){
                res.status(400).json({message:'Sorry, customer only!'})
            }

            const token = jwt.sign({
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone
            },
                "RANDOM-TOKEN", 
                {
                    expiresIn : "2h"
                }
            );
            res.status(200).json({
                token, 
                fullname: user.fullname,
                email: user.email,
                phone: user.phone
            });
        } catch(error){
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexDestination: async (req, res) => {
        try {
            const destination = await Destination.find();
            res.status(200).json({message: 'Success', destination })
        } catch(error){
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexAirline: async ( req, res ) => {
        try {
            const airline = await Airline.find();
            res.status(200).json({message: 'Success', airline })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexAirport: async ( req, res ) => {
        try {
            const airports = await AirportList.find();
            res.status(200).json({message: 'Success', airports })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexAbout: async ( req, res ) => {
        try {
            const about = await About.find();
            res.status(200).json({message: 'Success', about })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexHomeBanner: async ( req, res ) => {
        try {
            const homeBanner = await BannerHome.find();
            res.status(200).json({message: 'Success', homeBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexOrderBanner: async ( req, res ) => {
        try {
            const orderBanner = await BannerOrder.find();
            res.status(200).json({message: 'Success', orderBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexAboutBanner: async ( req, res ) => {
        try {
            const aboutBanner = await BannerAbout.find();
            res.status(200).json({message: 'Success', aboutBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexDestinationBanner: async ( req, res ) => {
        try {
            const destinationBanner = await BannerDestination.find();
            res.status(200).json({message: 'Success', destinationBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexAirlineBanner: async ( req, res ) => {
        try {
            const airlineBanner = await BannerAirline.find();
            res.status(200).json({message: 'Success', airlineBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexSupportBanner: async ( req, res ) => {
        try {
            const supportBanner = await BannerSupport.find();
            res.status(200).json({message: 'Success', supportBanner })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexPromo: async ( req, res ) => {
        try {
            const promo = await Promo.find();
            res.status(200).json({message: 'Success', promo })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexPromotion: async ( req, res ) => {
        try {
            const promotion = await Promotion.find();
            res.status(200).json({message: 'Success', promotion })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexFlightSchedule: async (req, res) => {
        try {
            const flightSchedule = await FlightSchedule.find()
                .populate('departureAirportId')
                .populate('arrivalAirportId')
                .populate('airlineId');
            res.status(200).json({ message: 'Success', flightSchedule });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexTestimonial: async ( req, res ) => {
        try {
            const testimonial = await Testimonial.find();
            res.status(200).json({message: 'Success', testimonial })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexUser: async ( req, res ) => {
        try {
            const user = await User.find();
            res.status(200).json({message: 'Success', user })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexPaymentMethod: async ( req, res ) => {
        try {
            const paymentmethod = await PaymentMethod.find();
            res.status(200).json({message: 'Success', paymentmethod })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id, fullname, email, phone, password } = req.body;
            const updateUser = await User.findOneAndUpdate({ _id:id}, {
                fullname: fullname,
                email: email,
                phone: phone,
                password: password
            }, {new: true});
            res.status(200).json({message: 'Success', updateUser })
        } catch(error){
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    searchFlight: async (req, res) => {
        try {
            const { 
                departureCity, 
                arrivalCity, 
                totalPassangers, 
                flightClass, 
                departureDate 
            } = req.query;

            const departureAirport = await AirportList.findOne({ city: departureCity, category: 'departure' });
            const arrivalAirport = await AirportList.findOne({ city: arrivalCity, category: 'arrival' });
            console.log(departureAirport);
            console.log(arrivalAirport);
            if (!departureAirport || !arrivalAirport) {
                return res.status(404).json({
                    message: 'departure or arrival airport not found'
                });
            }

            const searchFlight = {
                departureAirportId: departureAirport._id,
                arrivalAirportId: arrivalAirport._id,
                flightClass: flightClass,
                capacity: { $gte: totalPassangers },
                departureTime: {
                    $gte: new Date(departureDate),
                    $lt: new Date(new Date(departureDate).setDate(new Date(departureDate).getDate() + 1))
                }
            };
            const flights = await FlightSchedule.find(searchFlight)
                .populate('departureAirportId')
                .populate('arrivalAirportId')
                .populate('airlineId');

            const totalFlights = flights.length;

            res.status(200).json({
                message: 'Success',
                flights: flights,
                totalflights: totalFlights,
                searchFlight: req.query
            });
        } catch(error) {
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    selectFlight: async (req, res) => {
        try { 
            const { flight } = req.body;
            req.session.selectedFlight = flight;
            res.status(200).json({ message: 'Flight selected success' });
        } catch(error){
            res.status(400).json({
                message: 'Failed to get!',
                error: error.message
            });
        }
    },
    getSelectFlight: async (req, res) => {
        try { 
            if (req.session.selectedFlight) {
                res.status(200).json({ flight: req.session.selectedFlight });
            } else {
                res.status(404).json({ message: 'No flight selected' });
            }
        } catch(error){
            res.status(400).json({
                message: 'Failed to get this data',
                error: error.message
            });
        }
    },
    postReservation: async (req, res) => {
        try {
            const { 
                userId,
                userTitle,
                reservationDate,
                totalPayment,
                passengers,
                flightId
            } = req.body;
            // console.log(req.body);
            const flight = await FlightSchedule.findOne({ _id: flightId });
            const user = await User.findOne({ _id: userId });
    
            if (!user || !flight) {
                return res.status(400).json({
                    message: 'Sorry, you do not have to access.'
                });
            }
    
            const document = await Reservation.create({
                userId,
                userTitle,
                reservationDate,
                totalPayment,
                passengers,
                flightId
            });
    
            return res.status(200).json({
                message: 'Success. Reservation has been created',
                reservation: document
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to make reservation',
                error: error.message
            });
        }
    },
    indexReservation: async (req, res) => {
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
            res.status(200).json({
                message: 'Success', 
                reservation: reservation })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    showReservation: async (req, res) => {
        try {
            const {id} = req.params;
            const reservation = await Reservation.findOne({_id: id})
            .populate('userId')
            .populate('flightId');

            res.status(200).json({
                message: 'Success to get Reservation',
                reservation: reservation
            })
        } catch (error) {
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    postPayment: async (req, res) => {
        try {
            const { reservationId, paymentMethodId, deadline } = req.body;
            const document_reservation = await Reservation.findOne({ _id: reservationId});
            const document_paymentMethod = await PaymentMethod.findOne({_id: paymentMethodId });
            // console.log(document_reservation);

            if(!document_reservation || !document_paymentMethod) {
                return res.status(400).json({
                    message: "Sorry, you do not have to access."
                });
            }

            const payment = await Payment.create({
                reservationId,
                paymentMethodId,
                deadline,
                status: 'belum bayar'
            });

            res.status(200).json({
                message: 'Success, payment has been created.',
                data: payment
            });

        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    indexPayment: async (req, res) => {
        try {
            const payment = await Payment.find()
            .populate({
                path: 'reservationId',
                populate: [
                    { path: 'userId' },
                    {
                        path: 'flightId',
                        populate: [
                            { path: 'departureAirportId' },
                            { path: 'arrivalAirportId' },
                            { path: 'airlineId' }
                        ]
                    }
                ]
            })
            .populate('paymentMethodId');

            res.status(200).json({
                message: 'Success to get payment.',
                payment: payment
            });
        } catch (error) {
            // console.log(error);
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
    showPayment: async (req, res) => {
        try {
            const {id} = req.params;
            const payment = await Payment.findOne({_id:id})
            .populate({
                path: 'reservationId',
                populate: [
                    { 
                        path: 'flightId', model: 'flightSchedule'
                    }
                ]
            })
            .populate('paymentMethodId');

            res.status(200).json({
                message: 'Success to get one payment.',
                data: payment
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed',
                error: error.message
            });
        }
    },
}