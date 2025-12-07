//common session id remains saved in the form of cookie with each request in the browser.
const express = require("express");
const Posts = require("./routes/posts.js");     // routes are defined for particular models
const Users = require("./routes/users.js"); 
const cookieParser = require("cookie-parser");

const router = express.Router();
const app = express();
app.listen(3000, ()=>{
    console.log("Listening through port 3000");
})

app.use("/posts", Posts);
app.use("/users", Users);
app.get("/", (req, res)=>{
    res.send("Home Directory");
}); 

