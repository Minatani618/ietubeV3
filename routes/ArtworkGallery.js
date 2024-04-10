var express = require("express");
var router = express.Router();
const testModule = require("../ietubeModules/testModule");
const artworkCard = require("../ietubeModules/artworkCard");
const GalleryManager = require("../ietubeModules/GalleryManager");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("ArtworkGallery", { title: "Express" });
  const manager = new GalleryManager();
  console.log(manager.getArtworkDisplayList());
});

module.exports = router;
