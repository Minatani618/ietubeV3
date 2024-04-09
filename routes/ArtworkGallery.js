var express = require("express");
var router = express.Router();
const testModule = require("../ietubeModules/testModule");
const artworkCard = require("../ietubeModules/artworkCard");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("ArtworkGallery", { title: "Express" });
  console.log("nekoa");
  const ak = new artworkCard();
  ak.setArtworksFolder("artworks");
});

module.exports = router;
