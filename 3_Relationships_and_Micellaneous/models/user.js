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

const userSchema = Schema({
    username : String,
    address : [
        {
            location : String,
            city : String
        }
    ]
});

const User = mongoose.model("User", userSchema);

const addUser = async() => {
    let user1 = new User({
        username : "Mihir Gupta",
        address : [{        // defining a sub schema for child class and this is recogonised by mongodb too.
            //   _id : false   // this makes it a non sub document and no id will be given by mongodb by default
            location : "29 North City Enclave",
            city : "Lucknow"
        }]
    });

    user1.address.push({
        location : "409 Bh-2 Lovely Professional University",
        city : "Jalandhar"
    });

    let result = await user1.save();        // returns the added user
    console.log(result);
}

addUser();



