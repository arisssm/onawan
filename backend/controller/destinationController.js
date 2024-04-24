const Destination = require('../models/destination');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const destination = await Destination.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Destination';
            res.locals.onPage = 'destination';
            res.render('pages/destination', {destination, alert});
        } catch(error) {
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const { 
                name, 
                location, 
                price, 
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            } = req.body;

            // console.log(req.file);
            await Destination.create({
                name,
                location,
                image: req.file.filename,
                price,
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            });

            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/destination');
            
            // console.log(req.body);
        } catch(error){
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/destination');
        }
    },
    update: async (req, res) => {
        try {
            const {id, name, location, price, isRecommendation, idnRecommendation, interRecommendation} = req.body;
            // console.log(req.body);   
            // console.log(req.file);

            if(req.file !== undefined ) {
                await Destination.updateOne({_id:id}, {
                    name: name,
                    location: location,
                    image: req.file.filename,
                    price: price,
                    isRecommendation: isRecommendation,
                    idnRecommendation: idnRecommendation,
                    interRecommendation: interRecommendation
                })
            } else {
                await Destination.updateOne({_id:id}, {
                    name: name,
                    location: location,
                    price: price,
                    isRecommendation: isRecommendation,
                    idnRecommendation: idnRecommendation,
                    interRecommendation: interRecommendation
                })
            }
            console.log(req.file);
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/destination');

        } catch(error){
            console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/destination');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const destination = await Destination.findOneAndDelete({_id:id});
            if (destination && destination.image) {
                const imagePath = path.join(__dirname, '../public/images', destination.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/destination');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/destination');
        }
    }
}