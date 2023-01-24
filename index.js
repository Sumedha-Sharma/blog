// require stuff

const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const bodyParser= require("body-parser");
//require routers
const authRouter=require("./src/auth/router");
// create an express server
const app= express();


//apply middleware

app.use(cors());
app.use(bodyParser.json());
//DB Connection 
mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on("connected",()=>{
    console.log("DB CONNECTED");
})
//use Routers
app.use("/auth",authRouter);
app.use("/blog", blogRouter);
// app listener with callback function
app.listen(4000,()=>{
    console.log("Server start on 4000");

})
