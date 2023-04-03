require('dotenv').config();
const express = require("express");
const db = require('./models/index.model');
const userRoute = require("./routes/user.route");
const cors = require("cors");
const app = express();

// Config Cors
app.use(cors());
app.use((req,res,next) => db.initDatabase(req,res,next));
// Register Body Parser
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    success: 1,
    message: "it's working!"
  })
})

app.use('/user/', userRoute);


module.exports = app;