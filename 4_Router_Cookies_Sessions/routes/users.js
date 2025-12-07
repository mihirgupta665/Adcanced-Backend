const express = require("express");
const router = express.Router();    // Router is present in express as a class and object need to be created as router

router.get("/", (req, res)=>{
    res.send("Users Home!");
});

router.get("/:id", (req, res)=>{
    res.send(`Users id is ${req.params}`);
});


// the router object at last need to be exported
module.exports = router;



