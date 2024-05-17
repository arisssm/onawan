const Promo = require('../models/promo');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const documentPromo = await Promo.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Promo';
            res.locals.onPage = 'promo';
            res.render('pages/promo', {alert, documentPromo, userSession});
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const { headline } = req.body;
            console.log(req.files);
            const images = req.files.map(file => file.filename);

            await Promo.create({
                headline,
                image: images
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/promo');
            
            // console.log(req.body);
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promo');
        }
    },
    update: async (req, res) => {
        try {
            const { id, headline } = req.body;
            let images = [];
            let promo = await Promo.findById(id);
            if (!promo) {
                req.flash('alertMsg', 'promo not found');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin/promo');
            }
            if (req.files !== undefined && req.files.length > 0) {
                images = req.files.map(file => file.filename);
            }
            if (headline) {``
                promo.headline = headline;
            }
            if (images.length > 0) {
                if (images.length >= 1) {
                    images[0] = promo.image[0];
                }
                if (images.length === 2) {
                    images[1] = promo.image[1];
                }
            }
            await promo.save();
            // console.log(req.body);
            // console.log(req.files);
            console.log(images);
            req.flash('alertMsg', 'document has been updated');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/promo');
        } catch(error){
            console.log(error.message);
            req.flash('alertMsg', 'Failed to update. Error: ' + error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promo');
        }
    },    
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const promo = await Promo.findOneAndDelete({ _id: id });
            if (promo && promo.image && promo.image.length > 0) {
                promo.image.forEach(image => {
                    const imagePath = path.join(__dirname, '../public/images', image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                });
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/promo');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promo');
        }
    }
}