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

