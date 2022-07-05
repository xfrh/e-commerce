const router = require("express").Router();
const Product = require('../models/Product');
const { 
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('./verifyToken');

// create product

router.post("/", verifyTokenAndAuthorization, async(req,res)=>{
 const newProduct = new Product(req.body);
 try {
  const savedProduct = await newProduct.save();
  res.status(200).json(savedProduct);
 } catch (error) {
  res.status(500).json(error);
 }
});

//update product

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body,
      },
      {
        new:true
      },
    )
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error)
  }
});

//delete product

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error)
  }
});

//get userOrder

router.get("/find/:productId",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    const product = await Product.findOne({productId:req.params.productId});
    res.status(200).json(product)

  } catch (error) {
    res.status(500).json(error)
  }
});

//get all Products

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
