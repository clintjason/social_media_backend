const express = require('express');
const userCtrl = require('../controllers/user.ctrl');
const checkPwd = require('../middlewares/verifyPwd');
const checkInputs = require('../middlewares/checkInputs');
const limiter = require('../middlewares/rate-limiter');

// Create Express Router
const userRouter = express.Router();

userRouter.post('/signup', limiter, checkPwd, userCtrl.signup);
userRouter.post('/login', limiter, checkPwd, checkInputs.checkEmail, userCtrl.login);

module.exports = userRouter;