const bannerSupport = require('../models/supportBanner');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const dataBanner = await bannerSupport.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Banner support';
            res.locals.onPage = 'supportBanner';
            res.render('pages/supportBanner', {alert, dataBanner, userSession});
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    store: async (req, res) => {
        try {
            console.log(req.file);
            await bannerSupport.create({
                image: req.file.filename
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            // res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            res.redirect('/admin/support-banner');
        } catch(error) {
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            // res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            res.redirect('/admin/support-banner');
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.body;
            // console.log(req.file);
            const newImage = req.file.filename;
            const lastData = await bannerSupport.findOne({_id:id});
            if (lastData.image) {
                const lastImagePath = `public/images/${lastData.image}`;
                fs.unlinkSync(lastImagePath);
            }
            
            await bannerSupport.updateOne({_id:id}, {
                image: newImage,
            });
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            // res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            res.redirect('/admin/support-banner');

        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            // res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            res.redirect('/admin/support-banner');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const dataBanner = await bannerSupport.findOneAndDelete({_id:id});
            if (dataBanner && dataBanner.image) {
                const imagePath = path.join(__dirname, '../public/images', dataBanner.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/support-banner');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/support-banner');
        }
    }
}