const Promotion = require('../models/promotion');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const promotion = await Promotion.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Promotion';
            res.locals.onPage = 'promotion';
            res.render('pages/promotion', {alert, promotion, userSession});
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const { name } = req.body;
            // console.log(req.body);
            // console.log(req.file);
            await Promotion.create({
                name, image: req.file.filename
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/promotion');
            // console.log(req.body);
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promotion');
        }
    },
    update: async (req, res) => {
        try {
            const {id, name } = req.body;
            console.log(req.body);
            
            if (req.file !== undefined ) {
                const newImage = req.file.filename;
                const lastData = await Promotion.findOne({_id:id});
                if (lastData.image) {
                    const lastImagePath = `public/images/${lastData.image}`;
                    fs.unlinkSync(lastImagePath);
                }
                
                await Promotion.updateOne({_id:id}, {
                    name: name,
                    image: newImage,
                });
            } else {
                await bannerOrder.updateOne({_id:id}, {
                    name: name
                });
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/promotion');
        } catch(error){
            console.log(error.message);
            req.flash('alertMsg', 'Failed to update. Error: ' + error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promotion');
        }
    },    
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const promotion = await Promotion.findOneAndDelete({_id:id});
            if (promotion && promotion.image) {
                const imagePath = path.join(__dirname, '../public/images', promotion.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/promotion');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/promotion');
        }
    }
}