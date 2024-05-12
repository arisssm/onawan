const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        try {
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Register Account';
            res.render('pages/register', {alert});
        } catch(error){
            console.log(error);
            req.flash('alertMsg', 'Failed, error code: ' + error.message); 
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/register');
        }
    },
    postRegister: async (req, res) => {
        try {
            const { fullname, email, phone, password } = req.body;
            // console.log(req.body);
            await User.create({
                fullname, email, phone, password, role:'Admin'
            });
            req.flash('alertMsg', 'Done, your account has been created!'); 
            req.flash('alertStatus', 'success');
            res.redirect('/admin/register');
        } catch(error){
            // console.log(error);
            req.flash('alertMsg', 'Failed, error code: ' + error.message); 
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/register');
        }
    },
    login: async (req, res) => {
        try {
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Login Account';
            res.render('pages/login', {alert});
        } catch(error){
            console.log(error);
            req.flash('alertMsg', 'Failed, error code: ' + error.message); 
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    authLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email:email });
            if(!user) {
                req.flash('alertMsg', 'User email not found. Please check again !!');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin')
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                req.flash('alertMsg', 'User password not found. Please check again !!');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin')
            }
            if( user.role != 'Admin' ){
                req.flash('alertMsg', ' What are you doing here? You are not admin !!');
                req.flash('alertStatus', 'danger');
                return res.redirect('/admin')
            }

            req.session.user = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone
            }
            req.flash('alertMsg', 'Hello, welcome '+ user.fullname +'. Good luck for today !!');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/dashboard');
        } catch(error){
            req.flash('alertMsg', 'Failed, error code: ' + error.message); 
            req.flash('alertStatus', 'danger');
            res.redirect('/admin');
        }
    },
    index: async (req, res) => {
        try {
            const user = await User.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            const userSession = req.session.user;
            res.locals.title = 'Onawan | User Account';
            res.locals.onPage = 'user';
            res.render('pages/user', {alert, user, userSession});
        } catch(error){
            console.log(error);
            req.flash('alertMsg', 'Failed, error code: ' + error.message); 
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    }
}