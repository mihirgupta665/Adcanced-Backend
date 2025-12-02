// one to too many (squillions)     // adding parent directly to child collection
const mongoose = require("mongoose");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationships_demo");
}

main().then(()=>{
    console.log("Connection Established Successfully");
}).catch(()=>{
    console.log("Error in connecting with the database...");
})

let  {Schema} = mongoose;
const userSchema = Schema({
    name : String,
    email : String
});
const User = mongoose.model("User", userSchema);

const postSchema = Schema({
    content : String,
    likes : Number,
    user : {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
});
const Post = mongoose.model("Post", postSchema);

/*
const addData = async () => {
    let user1 = new User({
        name : "Mihir Gupta",
        email : "mihirgupta665@gmail.com"
    });
    await user1.save();

    let post1 = new Post({
        content : "This is my post!",
        likes : 7,
    });

    post1.user = user1;
    await post1.save();
}

addData();
*/

const populateData = async () => {
    let result = await Post.find({}).populate("user", "name");      // polulate the object's parameter path
    console.log(result);
}

populateData();

// denormalization : Storing Copy or duplicates
