const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const findById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    if(user.length == 0) {
      throw {status: 404, message: "User Not Found"};
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(error.status ? error.status: 500).json({Error: error.message});
  }
}

const findAll = async (req, res) => {
  try {
    const user = await userModel.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({Error: error});
  }
}

const updateOne = async (req, res) => {
  console.log("update user");
  try {
    const user = await userModel.findById(req.params.id)
    if(user.length == 0) {
      throw {status: 404, message: "User Not Found"};
    }
    const id = req.params.id;
    const result = await userModel.update(id, req.body)
    console.log("result is: ", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status ? error.status: 500).json({Error: error.message});
  }
}

module.exports = {
  signup: async (req, res) => {
    console.log('signup');
    try {
      const found = await userModel.findUserByEmail(req.body.email);
      console.log(found);
      if(found.length > 0) {
        throw {status: 401, message: "User Already Exists"};
      }
      const hashedPwd = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPwd);
      const userData = {
        ...req.body,
        password: hashedPwd,
        profile: "https://res.cloudinary.com/finance-tutoring/image/upload/v1655413937/users/trh0mod2g8ghzw15ep3v.png",
      }
      console.log(userData);
      const result = await userModel.createUser(userData);
      console.log("the result: ", result);
      if(!result.affectedRows) {
        throw {status: 401, message: "Could Not Create User"};
      }
      res.status(201).json({message: "New User Created Successfully."})
    } catch (error) {
      res.status(error.status ? error.status: 500).json({"Error": error.message})
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.findUserByEmail(req.body.email);
      if(user.length == 0) {
        throw {status: 404, message: "User not Found"};
      }
      let valid = await bcrypt.compare(req.body.password,user[0].password);
      if(!valid) {
        throw {status: 403, message: "Password is invalid"};
      }
      res.status(200).json({
        'userId':user[0].id,
        'isAdmin': user[0].isAdmin,
        'username': user[0].username,
        'email': user[0].email,
        'token': jwt.sign(
          {
            userId: user[0].id,
            isAdmin: user[0].isAdmin
          },
          process.env.SECRET_KEY,
          {expiresIn: process.env.EXPIRE_KEY}),
        message: "Login Successfully"
      });
    } catch (error) {
      res.status(error.status ? error.status: 500).json({"Error": error.message})
    }
  },
  findById,
  findAll,
  updateOne
}