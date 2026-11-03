const Register = async () => {
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
        res.cookie('token', token,{
            expires : new Date(Date.now()+1000+60*60*24*7)
        })
        res.status(201).json({
            message:"User Register successfully",
            user:user
        })
    
        res.status(201).json({
            message: "User created successfully",
            user: user
        })
}

module.exports = {Register}