const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile')

require('dotenv').config()

const app =  express();
const port = 3000;
const mongoose = require("mongoose")



const DB_URI = process.env.MONGODB_URI
// make the connection to db
// on success return successful string
console.log(DB_URI)
app.use(bodyParser.json())
mongoose
    .connect(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.use('/', userRoutes);
app.use('/', profileRoutes)
app.listen(port, ()=>{
    console.log(`Server is listening at htpp://localhost:${port}`)
})
//  => {
//     res.send(userRoutes)
// })