var express = require("express");
var router = express.Router();
const artworkCard = require("../ietubeModules/artworkCard");
const GalleryManager = require("../ietubeModules/GalleryManager");

//ContentsListへのルーティング(このページのサブルーター)
var contentsListRouter = require("./ContentsList");
router.use("/ContentsList", contentsListRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/ArtworkGallery/1");
});

router.get("/:page", (req, res, next) => {
  const page = req.params.page;

  //ページ数指定が0以下の時は1としてリダイレクト
  if (page <= 0) {
    res.redirect("/ArtworkGallery/1");
    return;
  }

  //ページ管理者を召喚（このページにどの作品を表示するかを管理）
  const manager = new GalleryManager();
  const artworksFolderNameList = manager.getArtworkListOfPage(page);

  //ページ数が最大ページ数を超えている時は最大ページ数としてリダイレクト
  const maxPage = manager.getMaxPage();
  if (page > maxPage) {
    res.redirect(`/ArtworkGallery/${maxPage}`);
    return;
  }

  //このページに表示する作品のカードを作成
  let artworkCards = [];
  for (let i = 0; i < artworksFolderNameList.length; i++) {
    const card = new artworkCard(artworksFolderNameList[i]);
    /* console.log(card); */
    artworkCards.push(card);
  }

  //ページ描画
  res.render("ArtworkGallery", { title: "ietube: Artwork Gallery", artworkCards: artworkCards, page: page });
});

module.exports = router;
