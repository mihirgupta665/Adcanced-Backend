//common session id remains saved in the form of cookie with each request in the browser.
const express = require("express");
const Posts = require("./routes/posts.js");     // routes are defined for particular models
const Users = require("./routes/users.js"); 
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");      // whenever we need to add a session id we need to import express-session
const flash = require("connect-flash");     // npm i connect-flash : to flash message we need to import connect-flash npm package
const path = require("path");

const router = express.Router();
const app = express();
app.listen(3000, ()=>{
    console.log("Listening through port 3000");
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressSession({
    secret : "MySuperSecretCode",
    resave: false,
    saveUninitialized : true
}));    // Session ID : every page of teh website will be having now a session id
app.use(cookieParser("secret"));
app.use(flash());   // the flash-connect object need to be used in application

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

app.get("/register", (req, res)=>{
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name == "anonymous"){
        // first time flash for key need to be written written in pair of key and vlaue
        req.flash("error", "Error in Registration!");       
    }
    else{
        req.flash("success", "User Registered Successfully!");  // defining req.flash(message);
    }
    res.redirect("/greet");
});

app.get("/greet", (req, res)=>{
    res.locals.successMsg = req.flash("success");       // creatign local variable : they can be accessed by name directly
    res.locals.errorMsg = req.flash("error");
    // res.render("show.ejs", { name : req.session.name, msg : req.flash("success") });    // already initialized flash message could be extracted using the key
    res.render("show.ejs", { name: req.session.name });    // already initialized flash message could be extracted using the key
});

// default server side session temporary storage is called as memeory storage
