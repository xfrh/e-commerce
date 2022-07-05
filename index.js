const express =require('express');
const mongoose = require('mongoose')
const cors = require("cors");
const app =express();
const dotenv = require("dotenv");
const authRoute = require("./Routes/Auth")
const userRoute = require("./Routes/User")
const cartRoute = require("./Routes/Cart")
const orderRoute = require("./Routes/Order")
const productRoute = require("./Routes/Product")
const stripRoute = require("./Routes/Strip")

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB Connection Successfull!')
).catch((err)=>{console.log(err);}
)
app.use(cors());
app.use(express.json());
app.use("api/auth",authRoute)
app.use("api/user",userRoute)
app.use("api/cart",cartRoute)
app.use("api/order",orderRoute)
app.use("api/product",productRoute)
app.use("api/payment",stripRoute)
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port " + process.env.PORT);
});


