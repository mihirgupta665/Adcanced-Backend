const mongoose = require("mongoose");
let {Schema} = mongoose;
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationships_demo");
}

main().then(()=>{
    console.log("Conennection Establsihed Successfully");
}).catch(()=>{
    console.log("Error in establishing the connection with mongodb");
});

const orderSchema = Schema({
    item: String,
    price: Number
});

const Order = mongoose.model("Order", orderSchema);

let addOrder = async () => {
    let result = await Order.insertMany([
        {
            item : "Samosa",
            price : 12
        },
        {
            item : "Chips",
            price : 25
        },
        {
            item: "Chocolate",
            price : 120
        }
    ]);
    console.log(result);
}

addOrder();

const customerSchema = Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,             // Schema.Types.ObjectId : if type is an object id then  Schema.Types.ObjectId is written
            ref: "Order"        // ref : states the reference from which objectid need to be mapped
        }
    ]
});

