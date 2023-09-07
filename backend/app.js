const express = require("express");
const app = express();
const mongo = require("mongoose");
const bd=require('body-parser');
const userRoute= require("./router/userRoute");
const productRoute = require("./router/productRoute");
const sellerRoute = require("./router/sellerRoute");
const dotenv=require('dotenv');
const fileUpload = require('express-fileupload')
dotenv.config();

mongo.connect(process.env.DB_URL_VISHAL);

  mongo.connection.on('error',err=>{
    console.log("Error connection failed!!");
});

mongo.connection.on('connected',connected=>{
    console.log("Connected Successfully!");
});
app.use(fileUpload({
    useTempFiles:true
}));

app.use(bd.urlencoded({ extended: false }));
app.use(bd.json());
app.use(userRoute);
app.use(sellerRoute);
app.use(productRoute);

app.use((req,res)=>{
    res.status(404).json({
        msg: "Error Bad Request"
    })
})
module.exports = app;