const express = require('express');
const userCtrl = require('../controllers/user.ctrl');
const checkPwd = require('../middlewares/verifyPwd');
const checkInputs = require('../middlewares/checkInputs');
const limiter = require('../middlewares/rate-limiter');
const auth = require('../middlewares/auth');

// Create Express Router
const userRouter = express.Router();

userRouter.post('/signup', limiter, checkPwd, userCtrl.signup);
userRouter.post('/login', limiter, checkPwd, checkInputs.checkEmail, userCtrl.login);
userRouter.get('/',auth, userCtrl.findAll);
userRouter.get('/:id', auth, userCtrl.findById);
userRouter.put('/edit/:id',auth, userCtrl.updateOne);

module.exports = userRouter;