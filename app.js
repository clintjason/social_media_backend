require('dotenv').config();
const express = require("express");
const connector = require('./config/database');
const app = express();
app.get('/api', (req, res) => {
  res.json({
    success: 1,
    message: "it's working!"
  })
})

app.listen(process.env.APP_PORT, ()=> {
  console.log("server running on Port ", process.env.APP_PORT)
})