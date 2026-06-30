const jwt = require("jsonwebtoken");
const albumModel = require("../model/album.model");
const {uploadFile} = require("../services/storage.service");
const musicModel = require("../model/music.model");

async function createMusic(req,res){
   
    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id,
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
}

async function createAlbum(req,res){
        
    const {title,musics} = req.body;

    const album = await albumModel.create({
        title,
        musics:musics,
        artist:req.user.id
    });

    res.status(201).json({
        message:"new album created",
        album:{
            title,
            musics,
            artist:album.artist
        }
    });
}



module.exports={createMusic,createAlbum};