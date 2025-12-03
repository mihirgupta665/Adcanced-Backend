// one to many  // approach 2 : array of child's object id referneces
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

customerSchema.pre("findOneAndDelete", async () => {
    console.log("Pre middleware");
});
customerSchema.post("findOneAndDelete", async () => {
    console.log("Post Middleware");
});

const Customer = mongoose.model("Customer", customerSchema);



/*
let addCustomer = async () =>{
    let customer1 = new Customer({      // only name is inserted, order could be inserted later on
        name: "Mihir Gupta",
    });

    let order1 = await Order.findOne({ item : "Chips"});        // order is finded by findOne function and one value of item
    let order2 = await Order.findOne({ item : "Chocolate"});

    customer1.orders.push(order1);      // although type is just the id but the intire order could be pushed
    customer1.orders.push(order2);      // mongoose will show that entire object is pushed but in mongodb only the object id will be stored.

    let result = await customer1.save();        // always save the saved document and try to print it for debugging purpose
    console.log(result);
}

addCustomer();
*/

/*
const findCustomer = async () => {
    let result1 = await Customer.find({});
    console.log(result1);

    // .populate("field_containing_Object_Id") : is used to replace the objectid with the corresponding object data(informations).
    let result2 = await Customer.find({}).populate("orders");
    console.log(result2);
    console.log(result2[0]);
}

findCustomer();
*/

/*
const addNew = async () => {
    let newOrder = new Order({
        item : "pizza",
        price : 450
    });

    let newCustomer = new Customer({
        name : "Vaishali",
    });

    await newOrder.save();

    newCustomer.orders.push(newOrder);
    await newCustomer.save();

    console.log("New Customer Successfully Inserted");
}

addNew();
*/

/*
Mongoose Middleware : 
    pre: runs before the query is executed
    post: runs after the query is executed



*/

// to delete thorugh mogosh write  db.orders.deleteOne({_id : ObjectId("6930409d77de926e6b7825f7")})


const delNew = async () => {
    let delres = await Customer.findByIdAndDelete('6930409d77de926e6b7825f8');
    console.log(delres);
}

delNew();