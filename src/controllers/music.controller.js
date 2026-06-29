const jwt = require("jsonwebtoken");
const userModel = require("../model/music.model");
const {uploadFile} = require("../services/storage.service");
const musicModel = require("../model/music.model");

async function createMusic(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

    try {
       const decoded =  jwt.verify(token,process.env.JWT_SECRET);

       if(decoded.role !== "artist"){
            return res.status(403).json({message:"you dont have access to create music"});
       }

       const {title} = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri:result.url,
            title,
            artist:decoded.id,
        })

        res.status(201).json({
            message:"Music created Successfully",
            music:{
                id:music._id,
                uri:music.uri,
                title:music.title,
                artist:music.artist
            }
        });
    } catch(error) {

        console.log(error);

        return res.status(401).json({
            message:"Unauthorized"
        });
    }


}



module.exports={createMusic};