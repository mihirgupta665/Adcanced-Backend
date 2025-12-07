//common session id remains saved in the form of cookie with each request in the browser.
const express = require("express");
const Posts = require("./routes/posts.js");     // routes are defined for particular models
const Users = require("./routes/users.js"); 
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");      // whenever we need to add a session id we need to import express-session


const router = express.Router();
const app = express();
app.listen(3000, ()=>{
    console.log("Listening through port 3000");
})

app.use(expressSession({
    secret : "MySuperSecretCode",
    resave: false,
    saveUninitialized : true
}));    // Session ID : every page of teh website will be having now a session id
app.use(cookieParser("secret"));
app.use("/posts", Posts);
app.use("/users", Users);
app.get("/", (req, res)=>{
    res.cookie("TestCode", "Wow", {signed : true});    // signing the coking name value pair therefore need to add middleware of cookie parser
    res.send("Home Directory");
}); 
app.get("/test", (req, res)=>{
    res.send("Testing Successfull");
});
app.get("/record", (req, res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;    // stored in memory storage (default server side temporary session storage)
    }
    res.send(`The Response is made for the ${req.session.count} times`);
});

// default server side session temporary storage is called as memeory storage
