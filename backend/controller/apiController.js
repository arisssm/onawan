const Destination = require ('../models/destination');
const Airline = require('../models/airline');
const About = require('../models/about');
const BannerHome = require ('../models/homeBanner');
const BannerDestination = require ('../models/destinationBanner');
const BannerOrder = require ('../models/orderBanner');
const BannerAbout = require ('../models/aboutBanner');
const Promo = require ('../models/promo');
const Testimonial = require ('../models/testimonial');
const Flight = require ('../models/flight');
const PaymentMethod = require ('../models/paymentMethod');
const User = require ('../models/user');


module.exports = {
    registerUser: async (req, res) => {
        try {

        } catch(error) {

        }
    },
    loginUser: async (req, res) => {
        try {
            
        } catch(error) {

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
                error
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
                error
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
                error
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
                error
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
                error
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
                error
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
                error
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
                error
            });
        }
    },
    indexFlight: async ( req, res ) => {
        try {
            const flight = await Flight.find();
            res.status(200).json({message: 'Success', flight })
        } catch(error) {
            // console.log(error.message);
            res.status(400).json({
                message: 'Failed',
                error
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
                error
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
                error
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
                error
            });
        }
    },
    logoutUser: async (req, res) => {
        try {

        } catch(error) {

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
                error
            });
        }
    },
    searchFlight: async (req, res) => {
        try {

        } catch(error) {

        }
    },
    postReservation: async (req, res) => {
        try {

        } catch(error) {

        }
    },
    postPayment: async (req, res) => {
        try {

        } catch(error) {

        }
    },
}