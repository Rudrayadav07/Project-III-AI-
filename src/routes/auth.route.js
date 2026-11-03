const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const router = express.Router()
const {Register} = require("../controller/auth.controller")
/*
POST /Register
POST /Login
GET /user[Protected]
*/

router.post("/register", Register)

router.get("/user", async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized token not found"
        })
    }
    try{
        const decoded  =  jwt.verify(token,process.env.token)
        const user = await userModel.findOne({
            _id:decoded.id
        })
        return res.json({
            message:"user Data fetched"
        })
    }
    catch(error){
        res.status(401).json({
            message:"unauthorized user token is in valid"
        })
    }
})
router.post("/login", async ()=>{
    const {username,password} = req.body

    const user =  await userModel.findOne({
        username
    })
    if(!user){
       return res.status(404).json({
            message:"User not found"
        })
    }
    const isPasswordValid = user.password === password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token,{
        expires: new Date(Date.now()+1000+60*60*24*7)
    })

    res.status(200).json({
        message:"User logged in Successfully",
        user:user
    })

})

router.get("/logout", (req,res)=>{
    res.clearCookie("token");
    res.status("200").json({
        message:"User logged out Successfully"
    })
})
module.exports = router;