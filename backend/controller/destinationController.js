const Destination = require('../models/destination');

module.exports = {
    index: async (req, res) => {
        try {
            const destination = await Destination.find();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.locals.title = 'Onawan | Destination';
            res.locals.onPage = 'destination';
            res.render('pages/destination', {destination, alert});
        } catch(error) {
            console.log(error.message);
        }
    },
    store: async (req, res) => {
        try {
            const { 
                name, 
                location, 
                image, 
                price, 
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            } = req.body;

            await Destination.create({
                name,
                location,
                image,
                price,
                isRecommendation, 
                idnRecommendation, 
                interRecommendation
            });
            req.flash('alertMsg', 'Data berhasil di simpan');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/destination');
            
            // console.log(req.body);
        } catch(error){
            console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/destination');
        }
    },
    update: async (req, res) => {
        try {
            const {id, name, location, image, price, isRecommendation, idnRecommendation, interRecommendation} = req.body
            console.log(req.body);

            await Destination.updateOne({_id:id}, {
                name: name,
                location: location,
                image: image,
                price: price,
                isRecommendation: isRecommendation,
                idnRecommendation: idnRecommendation,
                interRecommendation: interRecommendation
            })
            req.flash('alertMsg', 'Data berhasil di ubah');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/destination');

        } catch(error){
            console.log(error.message);
            req.flash('alertMsg', error.message );
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/destination');
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params;

            await Destination.deleteOne({_id:id});

            res.redirect('/admin/destination');
        } catch(error) {
            console.log(error.message);
        }
    }
}