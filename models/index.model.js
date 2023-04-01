const userModel = require('./user.model');



module.exports = {
  initDatabase: async (req, res, next) => {
    try {
      const result = await userModel.createUserTable();
      if(!result) {
        res.status(500).json({message: "Could Not Create User Table."})
      }
      console.log("Database Tables Created Successfully")
      next()
    } catch (error) {
      res.status(500).json({"error": error})
    }
  }
}