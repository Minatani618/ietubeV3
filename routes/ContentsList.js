/* routes */
var express = require("express");
var router = express.Router();
const contentsManager = require("../ietubeModules/contentsManager");

router.get("/:artworkName", function (req, res, next) {
  const artworkName = req.params.artworkName;

  const manager = new contentsManager(artworkName);
  manager.createContentCardList();
  const hrefWithoutFileName = manager.getHrefWithoutFileName();
  const contentCards = manager.getContentsCards();
  console.log(contentCards);
  const thisPagePath = `/ArtworkGallery/ContentsList/${artworkName}/`;
  res.render("ContentsList", {
    title: "Contents List",
    artworkName: artworkName,
    hrefWithoutFileName: hrefWithoutFileName,
    contentCards: contentCards,
    thisPagePath: thisPagePath,
  });
});

router.post("/:artworkName", function (req, res, next) {
  const artworkName = req.params.artworkName;
  const reqBody = req.body;
  const deleteContentsStrings = reqBody.delete;
  const addFavContentsStrings = reqBody.addFav;

  const manager = new contentsManager(artworkName);

  //削除の場合
  if (deleteContentsStrings != undefined) {
    //ファイル名がエンコードされているとファイル名変更できずエラーとなるため
    const decodedDeleteContentsStrings = decodeURIComponent(deleteContentsStrings);
    manager.deleteContents(decodedDeleteContentsStrings);
  }

  //お気に入り登録の場合
  if (addFavContentsStrings != undefined) {
    //ファイル名がエンコードされているとファイル名変更できずエラーとなるため
    const decodedAddFavContentsStrings = decodeURIComponent(addFavContentsStrings);
    manager.addFavContents(decodedAddFavContentsStrings);
  }

  manager.createContentCardList();
  const hrefWithoutFileName = manager.getHrefWithoutFileName();
  const contentCards = manager.getContentsCards();
  const thisPagePath = `/ArtworkGallery/ContentsList/${artworkName}/`;
  res.render("ContentsList", {
    title: "Contents List",
    artworkName: artworkName,
    hrefWithoutFileName: hrefWithoutFileName,
    contentCards: contentCards,
    thisPagePath: thisPagePath,
  });
});

module.exports = router;
