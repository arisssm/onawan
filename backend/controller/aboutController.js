const About = require('../models/about');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const about = await About.find();
            const userSession = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | About Us';
            res.locals.onPage = 'about';
            res.render('pages/about', {about, alert, userSession});
        } catch(error) {
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
            await About.create({
                history,
                imageHistory,
                vision,
                image,
                mission
            });
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            // res.redirect('/admin/about');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            // res.redirect('/admin/about');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
        }
    },
    update: async (req, res) => {
        try {
            const { id, history, vision, mission } = req.body;
            const about = await About.findOne({_id: id});
            if (!about) {
                req.flash('alertMsg', 'Failed, data not found');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin/about');
            }
            about.history = history;
            about.vision = vision;
            about.mission = mission;
            if (req.files['imageHistory']) {
                const newImageHistory = req.files['imageHistory'][0].filename;
                if (about.imageHistory) {
                    const imageHistoryPath = path.join(__dirname, '../public/images', about.imageHistory);
                    if (fs.existsSync(imageHistoryPath)) {
                        fs.unlinkSync(imageHistoryPath);
                    }
                }
                about.imageHistory = newImageHistory;
            }
            if (req.files['image']) {
                const newImage = req.files['image'][0].filename;
                if (about.image) {
                    const imagePath = path.join(__dirname, '../public/images', about.image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                about.image = newImage;
            }
            await about.save();
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