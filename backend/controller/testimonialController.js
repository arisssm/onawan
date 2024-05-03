const DocumentTestimonial = require('../models/testimonial');
const fs = require('fs');
const path = require('path');
module.exports = {
    index: async (req, res) => {
        try {
            const testimonial = await DocumentTestimonial.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Testimonial';
            res.locals.onPage = 'testimonial';
            res.render('pages/testimonial', {alert, testimonial});
        } catch(error) {
            // console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    store: async (req, res) => {
        try {
            const { fullname, status, content } = req.body;
            await DocumentTestimonial.create({
                fullname, status, content, image: req.file.filename
            })
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/testimonial');
        } catch(error) {
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/testimonial');
        }
    },
    update: async (req, res) => {
        try {
            const { id, fullname, status, content } = req.body;
            console.log(req.body);
            if (req.file !== undefined ) {
                const newImg = req.file.filename;
                const lastData = await DocumentTestimonial.findOne({_id:id});
                if (lastData.image) {
                    const imgPath = `public/images/${lastData.image }`;
                    fs.unlinkSync(imgPath);
                }

                await DocumentTestimonial.updateOne({_id:id},{
                    fullname: fullname,
                    status: status,
                    content: content,
                    image: newImg
                });
            } else {
                await DocumentTestimonial.updateOne({_id:id},{
                    fullname: fullname,
                    status: status,
                    content: content
                });
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/testimonial');
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/testimonial');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            const document = await DocumentTestimonial.findOneAndDelete({_id:id});
            if (document && document.image) {
                const imagePath = path.join(__dirname, '../public/images', document.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/testimonial');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/testimonial');
        }
    }
}