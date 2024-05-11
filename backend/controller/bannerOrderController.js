const bannerOrder = require('../models/orderBanner');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const dataBanner = await bannerOrder.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Banner Order';
            res.locals.onPage = 'orderBanner';
            res.render('pages/orderBanner', {alert, dataBanner});
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    store: async (req, res) => {
        try {
            const { headline, subHeadline } = req.body;
            console.log(req.body);
            console.log(req.file);
            await bannerOrder.create({
                headline, subHeadline, image: req.file.filename
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/order-banner');
        } catch(error) {
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/order-banner');
        }
    },
    update: async (req, res) => {
        try {
            const {id, headline, subHeadline } = req.body;
            console.log(req.body);
            // console.log(req.file);
            
            if (req.file !== undefined ) {
                const newImage = req.file.filename;
                const lastData = await bannerOrder.findOne({_id:id});
                if (lastData.image) {
                    const lastImagePath = `public/images/${lastData.image}`;
                    fs.unlinkSync(lastImagePath);
                }
                
                await bannerOrder.updateOne({_id:id}, {
                    headline: headline,
                    subHeadline: subHeadline,
                    image: newImage,
                });
            } else {
                await bannerOrder.updateOne({_id:id}, {
                    headline: headline,
                    subHeadline: subHeadline,
                });
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/order-banner');

        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/order-banner');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const dataBanner = await bannerOrder.findOneAndDelete({_id:id});
            if (dataBanner && dataBanner.image) {
                const imagePath = path.join(__dirname, '../public/images', dataBanner.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/order-banner');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/order-banner');
        }
    }
}