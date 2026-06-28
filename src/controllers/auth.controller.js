const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const bcrpyt = require("bcryptjs");



async function registerUser(req,res){
    const {username,email,password,role = "user"} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        });
    }

    const hash = await bcrpyt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash, 
        role
    });

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(201).json({
        message:"new user registered",
        user
    });
}

async function loginUser(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(!user){
        return res.status(401).json({
            message: "Invalid Crendentials"
        });
    }

    const isValidpassword = await bcrpyt.compare(password,user.password);

    if(!isValidpassword){
        return res.status(401).json({
            message:"Invalid Crendentials"
        });
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"User Logged in Succesfully",
        user
    });
}



module.exports = {registerUser,loginUser};