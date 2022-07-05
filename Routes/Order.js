const router = require("express").Router();
const Order = require('../models/Order');
const { 
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('./verifyToken');

// create order

router.post("/", verifyTokenAndAuthorization, async(req,res)=>{
 const newOrder = new Order(req.body);
 try {
  const savedOrder = await newOrder.save();
  res.status(200).json(savedOrder);
 } catch (error) {
  res.status(500).json(error);
 }
});

//update order

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body,
      },
      {
        new:true
      },
    )
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error)
  }
});

//delete order

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error)
  }
});

//get userOrder

router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    const order = await Order.findOne({userId:req.params.userId});
    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json(error)
  }
});

//get all orders

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
  try {
    const orders = await Cart.find();
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
