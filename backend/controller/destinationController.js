const Destination = require('../models/destination');

module.exports = {
    index: async (req, res) => {
        try {
            const destination = await Destination.find();
            res.locals.title = 'Onawan | Destination';
            res.locals.onPage = 'destination';
            res.render('pages/destination', {destination});
        } catch(error) {
            console.log(error.message);
        }
    },
    store: async (req, res) => {
        try {
            const { 
                name, 
                location, 
                image, 
                price, 
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            } = req.body;

            await Destination.create({
                name,
                location,
                image,
                price,
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            });

            res.redirect('/admin/destination')

            // console.log(req.body);
        } catch(error){
            console.log(error.message);
        }
    }
}