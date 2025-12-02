const mongoose = require("mongoose");

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/relationships_demo");
}

main().then(()=>{
    console.log("Connection Established Successfull");
}).catch(()=>{
    console.log("Error in connection with the database...");
});

let { Schema } = mongoose;

