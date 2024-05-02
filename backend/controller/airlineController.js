const Airline = require('../models/airline');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const airlines = await Airline.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Airline';
            res.locals.onPage = 'airline';
            res.render('pages/airline', {alert, airlines});
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const {name} = req.body;

            await Airline.create({
                name,
                image: req.file.filename
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/airline');
            
            // console.log(req.body);
        } catch(error){
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/airline');
        }
    },
    update: async (req, res) => {
        try {
            const {id, name} = req.body;
            console.log(req.body);
            // console.log(req.file);
            
            if (req.file !== undefined ) {
                const newImage = req.file.filename;
                const lastAirline = await Airline.findOne({_id:id});
                if (lastAirline.image) {
                    const lastImagePath = `public/images/${lastAirline.image}`;
                    fs.unlinkSync(lastImagePath);
                }
                
                await Airline.updateOne({_id:id}, {
                    name: name,
                    image: newImage,
                });
            } else {
                await Airline.updateOne({_id:id}, {
                    name: name
                });
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/airline');

        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/airline');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const airlines = await Airline.findOneAndDelete({_id:id});
            if (airlines && airlines.image) {
                const imagePath = path.join(__dirname, '../public/images', airlines.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/airline');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/airline');
        }
    }
}