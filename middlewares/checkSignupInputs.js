const joi = require('joi');

module.exports = (req, res, next) => {
  const schema = joi.object({
    username: joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: joi.string().email().trim().required(),
    isAdmin: joi.boolean()
  })
  const {error, value} = schema.validate(req.body)
  error === undefined ? next() : res.status(401).json({error: "Invalid User Inputs"})
}
