const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const musicController = require("../controllers/music.controller");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();



router.post("/upload",authMiddleware.checkArtist,upload.single("music"),musicController.createMusic);
router.post("/album",authMiddleware.checkArtist,musicController.createAlbum);





module.exports = router; 