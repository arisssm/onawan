const PaymentMethod = require ('../models/paymentMethod');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        try {
            const paymentMethod = await PaymentMethod.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Payment Method ';
            res.locals.onPage = 'paymentMethod';
            res.render('pages/paymentMethod', { paymentMethod, alert});
        } catch(error) {
            // console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    store: async (req, res) => {
        try{
            const { name, accountNumber, accountHolder } = req.body;
            await PaymentMethod.create({ name, accountNumber, accountHolder, logo: req.file.filename});
            req.flash('alertMsg', 'New document has been saved');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'New document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/payment-method');
        } catch(error){
            console.log(error);
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/payment-method');
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const paymentMethod = await PaymentMethod.findOneAndDelete({_id:id});
            if(paymentMethod && paymentMethod.logo){
                const path_logo = path.join(__dirname, '../public/images', paymentMethod.logo);
                if (fs.existsSync(path_logo)) {
                    fs.unlinkSync(path_logo);
                }
            }
            req.flash('alertMsg', 'Warning, document has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/payment-method');
        } catch(error) {
             // console.log(error.message);
                req.flash('alertMsg', error.message );
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/payment-method');
        }
    },
    update: async (req, res) => {
        try {
            const { id, name, accountNumber, accountHolder} = req.body;
            if (req.file !== undefined) {
                const newLogo = req.file.filename;
                const data_paymentMethod = await PaymentMethod.findOne({_id:id});
                if (data_paymentMethod.logo) {
                    const logoPath = `public/images/${data_paymentMethod.logo }`;
                    fs.unlinkSync(logoPath); 
                }
                await PaymentMethod.updateOne({_id:id}, {
                    name: name,
                    accountNumber: accountNumber,
                    accountHolder: accountHolder,
                    logo: newLogo
                });
            } else {
                await PaymentMethod.updateOne({_id:id}, {
                    name: name,
                    accountNumber: accountNumber,
                    accountHolder: accountHolder
                });
            }
            req.flash('alertMsg', 'Success, document has been updated');
            req.flash('alertStatus', 'success');
            res.json({ alertMsg: 'Success, new document has been saved.', alertStatus: 'success' });
            // res.redirect('/admin/payment-method');
        } catch(error) {
            req.flash('alertMsg','Failed, error code: ' + error.message );
            req.flash('alertStatus', 'danger');
            res.json({ alertMsg: 'Failed, error code: ' + error.message, alertStatus: 'danger' });
            // res.redirect('/admin/payment-method');
        }
    }
}