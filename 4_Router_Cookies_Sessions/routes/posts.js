const express = require("express");
// npm i cookie-parser
const cookieParser = require("cookie-parser");      // whenever a cookie is to be amde signed we need cookie parser npm pakage to make the cookie parsed

const router = express.Router();   // Router is present in express as a class and object need to be created as router
const app = express();
router.use(cookieParser("secretcode"));     // whenever cookie is signed cookieParser is needed

router.get("/", (req, res) => {
    res.cookie("Name", "Mihir Gupta");
    res.send("User Home!");
});

router.get("/:id", (req, res) => {
    res.cookie("ID", "101", { signed: true });       // making cookie signed for security
    res.send(`ID page`);
});




// the router object at last need to be exported
module.exports = router;