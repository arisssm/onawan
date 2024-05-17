const bannerAbout = require('../models/aboutBanner');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const dataBanner = await bannerAbout.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Banner About';
            res.locals.onPage = 'aboutBanner';
            res.render('pages/aboutBanner', {alert, dataBanner, userSession});
        } catch(error) {
            // console.log(error);
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
            await bannerAbout.create({
                headline, subHeadline, image: req.file.filename
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/about-banner');
        } catch(error) {
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/about-banner');
        }
    },
    update: async (req, res) => {
        try {
            const {id, headline, subHeadline } = req.body;
            console.log(req.body);
            // console.log(req.file);
            
            if (req.file !== undefined ) {
                const newImage = req.file.filename;
                const lastData = await bannerAbout.findOne({_id:id});
                if (lastData.image) {
                    const lastImagePath = `public/images/${lastData.image}`;
                    fs.unlinkSync(lastImagePath);
                }
                
                await bannerAbout.updateOne({_id:id}, {
                    headline: headline,
                    subHeadline: subHeadline,
                    image: newImage,
                });
            } else {
                await bannerAbout.updateOne({_id:id}, {
                    headline: headline,
                    subHeadline: subHeadline,
                });
                
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/about-banner');

        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/about-banner');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const dataBanner = await bannerAbout.findOneAndDelete({_id:id});
            if (dataBanner && dataBanner.image) {
                const imagePath = path.join(__dirname, '../public/images', dataBanner.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/about-banner');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/about-banner');
        }
    }
}