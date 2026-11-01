const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const router = express.Router()

/*
POST /Register
POST /Login
GET /user[Protected]
*/

router.post("/register", async (req, res) => {
    const { username, password } = req.body
    const existingUser = await userModel.findOne({
        username
    })
    if (username) {
        return res.status(409).json({
            message: "Username Already exits"
        })
    }
    const user = await userModel.create({
        username, password
    })
    jwt.sign({
        id: user._id,
    },
        process.env.JWT_SECRET
    )
    res.cookie('token', token)
    res.status(201).json({
        message: "User created successfully",
        user: user
    })
})
module.exports = router