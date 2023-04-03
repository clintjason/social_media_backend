const joi = require('joi');

module.exports = {
  checkSignUpInputs: (req, res, next) => {
    const schema = joi.object({
      username: joi.string().alphanum().min(3).regex(/^[a-zA-Z]{1,}([a-zA-Z]*[-\ ]){0,}([a-zA-Z]){1,}$/).max(30).required(),
      email: joi.string().email().trim().required(),
      isAdmin: joi.boolean()
    })
    const user = req.body.isAdmin ? {
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin
    } : {
      username: req.body.username,
      email: req.body.email,
    }
    const {error, value} = schema.validate(user);
    console.log("the value: ",value)
    console.log("the error: ",error)
    console.log("the error: ",typeof(error))
    typeof(error) == 'undefined' ? next() : res.status(401).json({error: "Invalid User Inputs"})
  },
  checkEmail: (req, res, next) => {
    const schema = joi.string().email().trim().required();
    const {error, value} = schema.validate(req.body.email);
    console.log("the value: ",value)
    console.log("the error: ",error)
    console.log("the error: ",typeof(error))
    typeof(error) === 'undefined' ? next() : res.status(401).json({error: "Invalid User Inputs"})
  },
}
