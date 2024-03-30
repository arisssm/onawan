
module.exports = {
    index: (req, res) => {
        res.locals.title = 'Onawan | Dashboard'
        res.locals.onPage = 'dashboard'
        res.render('pages/dashboard');
        // res.render('pages/home');
    }
}