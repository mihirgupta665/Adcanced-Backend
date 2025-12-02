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
        address : [{
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



