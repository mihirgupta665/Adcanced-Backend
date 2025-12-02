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

// let addOrder = async () => {
//     let result = await Order.insertMany([
//         {
//             item : "Samosa",
//             price : 12
//         },
//         {
//             item : "Chips",
//             price : 25
//         },
//         {
//             item: "Chocolate",
//             price : 120
//         }
//     ]);
//     console.log(result);
// }

// addOrder();

const customerSchema = Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,             // Schema.Types.ObjectId : if type is an object id then  Schema.Types.ObjectId is written
            ref: "Order"        // ref : states the reference from which objectid need to be mapped
        }
    ]
});

const Customer = mongoose.model("Customer", customerSchema);

let addCustomer = async () =>{
    let customer1 = new Customer({      // only name is inserted, order could be inserted later on
        name: "Mihir Gupta",
    });

    let order1 = await Order.findOne({ item : "Chips"});        // order is finded by findOne function and one value of item
    let order2 = await Order.findOne({ item : "Chocolate"});

    customer1.orders.push(order1);      // although type is just the id butu the intire order could be pushed
    customer1.orders.push(order2);

    let result = await customer1.save();        // always save the saved document and try to print it for debugging purpose
    console.log(result);
}

addCustomer();