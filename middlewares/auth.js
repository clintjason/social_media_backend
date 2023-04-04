const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

/**
 * User Authentication Middleware
 * 
 * Description: Test if user token is valid
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @param {*} next Next Object
 * 
 * @returns next() method if token is valid and an error object
 * error: [error] with status 401 if token is compromised.
 */
const Authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        req.userId = userId;
        req.isAdmin = decodedToken.isAdmin;
        console.log("in auth now");
        console.log(req.baseUrl);
        console.log("ADMIN IS: ",req.isAdmin);
        console.log("USER IS: ",req.userId);


        if(req.isAdmin) {
            return next();
        } else {
            if(req.baseUrl === "/user") {
                console.log("in this one")
                if(req.method === 'PUT' || req.method === 'DELETE') {
                    let user = await userModel.findById(userId);
                    if(user.length == 0) {
                        throw {status: 404, message: "User not Found"};
                    }
                    console.log("The user Id: ", user[0].id);
                    if (user[0].id === userId) {
                        return next();
                    } else {
                        throw new Error('User Authentification failed');
                    }
                } else {
                    console.log("in where it should be")

                    if(!req.userId) {
                        throw new Error('User Authentification failed');
                    }
                    return next();
                }
            }
             if(req.baseUrl === "/api/post") {
                console.log("The request method: ",req.method);
                if(req.method === 'PUT' || req.method === 'DELETE') {
                    let post = await models.Post.findOne({where: {UserId: userId}});
                    console.log("The post UserId: ", post.UserId);
                    if (post.UserId !== userId ) {
                        throw new Error('User Authentification failed');
                    } else {
                        return next();
                    }
                } else {
                    if(!req.userId) {
                        throw new Error('User Authentification failed');
                    }
                    return next();
                }
            }
            if(req.baseUrl === "/api/comment") {
                if(req.method === 'PUT' || req.method === 'DELETE') {
                    let comment = await models.Comment.findOne({where: {UserId: userId}});
                    console.log("The comment UserId: ", comment.UserId);
                    if (comment.UserId !== userId) {
                        throw new Error('User Authentification failed');
                    } else {
                        return next();
                    }
                } else {
                    if(!req.userId) {
                        throw new Error('User Authentification failed');
                    }
                    return next();
                }
            }
         }
    } catch (error) {
        res.status(403).json({error: !parseInt(error) ? 'Unauthorized Request' : error});
    }
}

module.exports = Authentication;