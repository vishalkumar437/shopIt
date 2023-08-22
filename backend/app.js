const express = require("express");
const app = express();
const mongo = require("mongoose");
const bd=require('body-parser');
const userRoute= require("./router/userRoute");
const dotenv=require('dotenv');
dotenv.config();

mongo.connect(process.env.DB_URL_VISHAL);

  mongo.connection.on('error',err=>{
    console.log("Error connection failed!!");
});

mongo.connection.on('connected',connected=>{
    console.log("Connected Successfully!");
});

app.use(bd.urlencoded({extended:false}));
app.use(bd.json());
app.use(userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        msg: "Error Bad Request"
    })
})
module.exports = app;