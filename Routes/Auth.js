const router =require('express').Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register

const register = router.post("/register", async(req,res)=>{
 const newuser = new User({
   username:req.body.usename,
   email:req.body.email,
   password: CryptoJS.AES.encrypt(req.body.password,process.env.JWT).toString(),
   isAdmin:req.body.isAdmin,
   img:req.body.img

 });
 try {
  const saveduser = await newuser.save()
  res.status(200).json(saveduser);
 } catch (error) {
  res.status(500).json(error);
 }
})

//login

const login =router.post("/login", async(req,res)=>{
  try {
    const requiredUser = await User.findOne({username:req.body.usename})
    !requiredUser && res.status(401).json('user not found')
    if(requiredUser){
      const plainPassword = CryptoJS.AES.decrypt(requiredUser.password,process.env.JWT).toString(CryptoJS.enc.Utf8)
      if(plainPassword !== req.body.password){
          res.status(401).json('password is not correct')
      }

      const access_token = jwt.sign(
        {
          id: requiredUser._id,
          isAdmin:requiredUser.isAdmin,
        },
        process.env.JWT,
        {expiresIn:"3d"}

      );
      const{password,...others} = requiredUser._doc;
      res.status(200).json(...others,access_token);

    }
  } catch (error) {
    res.status(500).json(err);
  }
})

module.exports = router;