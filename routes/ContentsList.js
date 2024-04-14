/* routes */
var express = require("express");
var router = express.Router();
const contentsManager = require("../ietubeModules/contentsManager");

//ページ数なしの時は1としてリダイレクト
router.get("/:artworkName", function (req, res, next) {
  const artworkName = req.params.artworkName;
  res.redirect(`/ArtworkGallery/ContentsList/${artworkName}/1`);
});

router.get("/:artworkName/:page", function (req, res, next) {
  const artworkName = req.params.artworkName;
  const page = req.params.page;

  //ページ数指定が0以下の時は1としてリダイレクト
  if (page <= 0) {
    res.redirect(`/ArtworkGallery/${artworkName}/1`);
    return;
  }

  const manager = new contentsManager(artworkName);
  const hrefWithoutFileName = manager.getHrefWithoutFileName();
  const contentCards = manager.getContentsCards();
  res.render("ContentsList", {
    title: "Contents List",
    artworkName: artworkName,
    hrefWithoutFileName: hrefWithoutFileName,
    contentCards: contentCards,
  });
});

module.exports = router;
