const express = require('express');
const userCtrl = require('../controllers/user.ctrl');
const checkPwd = require('../middlewares/verifyPwd');
const checkInputs = require('../middlewares/checkSignupInputs');
const limiter = require('../middlewares/rate-limiter');

// Create Express Router
const userRouter = express.Router();

userRouter.post('/signup', limiter, checkPwd, checkInputs, userCtrl.signup);

module.exports = userRouter;