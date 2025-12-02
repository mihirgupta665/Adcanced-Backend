// at last of the middleware function express by default adds a default error handler.
// error is throw like =>  throw new Error("msg"), // statusCode and statusMessage is required

const express = require("express");
const ExpressError = require("./ExpressError.js"); 

const app = express();
app.listen(8080, () => {
    console.log("Listening through the port 8080");
})
app.get("/err", (req,res, next)=>{
    abcd=acbd;
})
// app.use((err, req, res, next)=>{
//     console.log("Error was encontered");
//     next(err);       // this passes the error to the express default error handler
// })

app.get("/api", (req, res, next)=>{
    let { token } = req.query;
    if(token=="give_access"){
        res.send("You are Viewing a highly important data");
    }
    else{
        throw new ExpressError(401, "Access Token Required!");

    }
});

app.use((err, req, res, next)=>{
    // status/message = x, there x becomes the default value for that variable.
    let { status=500, message="Sorry for some internal server error!" } = err;     // destructuring the error 
    res.status(status).send(message);       // converts err to json
});