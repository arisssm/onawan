const About = require('../models/about');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const about = await About.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | About Us';
            res.locals.onPage = 'about';
            res.render('pages/about', {about, alert});
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },

    store: async (req, res) => {
        try {
            const { 
                history, 
                vision, 
                mission 
            } = req.body;
            console.log(req.body);
            console.log(req.files);

            const imageHistory = req.files['imageHistory'][0].filename;
            const image = req.files['image'][0].filename;
            const bannerSupport = req.files['bannerSupport'][0].filename;

            await About.create({
                history,
                imageHistory,
                vision,
                image,
                mission,
                bannerSupport
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/about');
            // res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/about');
            // res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
        }
    },
    update: async (req, res) => {
        try {
            const { id, history, vision, mission } = req.body;
    
            if (req.files !== undefined && req.files !== null ) {
                if (req.files['imageHistory'] && req.files['imageHistory'].length > 0 &&
                    req.files['image'] && req.files['image'].length > 0 &&
                    req.files['bannerSupport'] && req.files['bannerSupport'].length > 0) {
    
                    const updateData = await About.findOneAndUpdate(
                        { _id: id },
                        {
                            history: history,
                            imageHistory: req.files['imageHistory'][0].filename,
                            vision: vision,
                            image: req.files['image'][0].filename,
                            mission: mission,
                            bannerSupport: req.files['bannerSupport'][0].filename
                        }
                    );
                    console.log(updateData);
                } else {
                    throw new Error("One or more file fields are missing.");
                }
            } else {
                const update = await About.findOneAndUpdate(
                    { _id: id },
                    { history: history, vision: vision, mission: mission }
                );
                console.log(update);
            }
    
            req.flash('alertMsg', 'Update document has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/about');
        } catch(error) {
            req.flash('alertMsg', 'Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/about');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            // const data = await About.findOne({_id:id});
            // console.log(data);
            const about = await About.findOneAndDelete({ _id: id });
            console.log(about);
            if (about) {
                if (about.image && about.image !== '') {
                    const imagePath = path.join(__dirname, '../public/images', about.image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                if (about.imageHistory && about.imageHistory !== '') {
                    const imageHistoryPath = path.join(__dirname, '../public/images', about.imageHistory);
                    if (fs.existsSync(imageHistoryPath)) {
                        fs.unlinkSync(imageHistoryPath);
                    }
                }
                if (about.bannerSupport && about.bannerSupport !== '') {
                    const bannerSupportPath = path.join(__dirname, '../public/images', about.bannerSupport);
                    if (fs.existsSync(bannerSupportPath)) {
                        fs.unlinkSync(bannerSupportPath);
                    }
                }
                req.flash('alertMsg', 'Warning, document has been deleted.');
                req.flash('alertStatus', 'warning');
            } else {
                req.flash('alertMsg', 'Document not found.');
                req.flash('alertStatus', 'danger');
            }
            res.redirect('/admin/about');
        } catch(error){
            console.log(error);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/about');
        }
    }
}