const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

module.exports = {
  signup: async (req, res) => {
    try {
      const body = req.body;
      console.log(body);
      const result = await userModel.createUser(body);
      console.log("the result: ", result);
      if(!result) {
        throw "Could Not Create User";
      }
      res.status(500).json({message: "New User Created Successfully."})
    } catch (error) {
      res.status(500).json({"Error": error})
    }
  }
}