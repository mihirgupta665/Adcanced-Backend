// Middlewares in express are the function which come into play when after request is received and before response is sent to client 
// ex: methodOveriride, express.static, express.urlencoded, bodyParser
/*
middleware ahve the properties to :
i> access req and res and could perform changes in both separately
ii> chainging (composite function)  thus middleware could call next middleware in the stack
iii> middleware could send response thus stopping the implementation of corresponding api or route
*/
// app.use(path, function) is used to to implement middleware and path(by default: all) defines the route for which middleware should work, and function defines what response to send or which nex middleware(function) to execute
// app.use((req,res,next)) : if current middleware function does not end the req and res cyle then it must call the next middle ware duntion next()
// Types of middleware : i> Application-level middleware, ii> Router-level middleware, iii> Error-handling middleware, iv> Built-in middleware, v> Third-party middleware

const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("listening through the port 8080");
});

const checkToken =  (req, res, next) => {
    let { token } = req.query;
    if (token === "give_access") {      // http://localhost:8080/api?token=give_access : could make aur authencate user to work on...
        next();
    }
    else {
        res.send("Access token is required... ACCESS DENIED!");
    }
};

app.get("/api", checkToken ,(req, res) => {     // (req, res) function only runs if the checkToken middleware function return next() else middleware function is executed and (req, res) is ignored
    res.send("This is highly authentic secured and encrypted Data");
})

app.use((req, res, next) => {
    // res.send("Ending the req res cycle") //iii> middleware could send response thus stopping the implementation of corresponding api or route
    console.log("1st Middleware was used...");      // if not send any response then page will keep on reloading again n again and nothing will be parsed to the client side.
    next(); // next : finds the next function(middleware) to apass the control.
    console.log("this is written after next");  // after next (passing od function ) we code write code and it will be still implemented
})

//logger -> morgan
// middleware should be written in firstly so it could have the access to request and response
// and in throgh the next() it could gtransfer the control to app.method() function which will finally send the response
app.use((req, res, next) => {
    console.log("2nd Middleware was used...");
    // .request : is verb or kind of request made
    // .hostname : send by which (generally, local host)
    console.log(req.method, "request is made by", req.hostname, "send though the path ->", req.path);
    // Date.now returns te instant date and time
    req.time = new Date(Date.now()).toString();     // to make it readable wrap it Date object and convert or parse it into string
    console.log("Request was sent at the time : " + req.time);
    next(); // next : means that call the corresponding api route
})

app.get("/", (req, res) => {
    res.send("Root Directory");
})

app.get("/home", (req, res) => {        // maches with all the route which are similar to "/home/?" 
    res.send("Home Directory ")
})

app.use((req, res, next) => {     // by deault path is all path so all the wrong path i.e. 404 page sends the same error message
    res.send("404 Error : Page Not Found!");
});
