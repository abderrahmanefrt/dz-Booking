const express = require('express');
const connectDB = require('./config/db');
connectDB();
const app= express();

app.get('/',(req,res)=>{
  res.send('is wprking')
})

app.listen(3000, ()=>{
  console.log('Server is running on port 3000');
})