const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined ){
        res.redirect('/admin');
    } else{
        next();
    }
}

const authJWT = async (req, res, next) => {
    try {
        // if (!req.header.authorization){
        //     throw new Error('Authorization header is missing!')
        // }
        const token = await req.headers.authorization.split(" ")[1];
        const checkToken = await jwt.verify(token, "RANDOM-TOKEN");
        const user = await checkToken;
        req.user = user;
        next();
    } catch(error){
        res.status(401).json({message: "Sorry,token not found. You cannot access for this action!"})
    }
}

module.exports = {checkLogin, authJWT };