/* ietubeModules */
const fs = require("fs");
const path = require("path");
const contentCard = require("./contentCard");

class contentsManager {
  constructor(artworkName) {
    this.contentsCards = [];
    this.targetArtwork = artworkName;
    this.setTargetArtworkPath();
  }

  setTargetArtworkPath() {
    this.targetArtworkPath = path.join(__dirname, `../public/artworks/${this.targetArtwork}`);
  }

  //作品フォルダ内を読み取ってファイル名のリストを作成
  createContentsNameList() {
    this.contentsNameList = fs.readdirSync(this.targetArtworkPath);
  }

  //表示するべきコンテンツのリストを作成
  createContentCardList() {
    //フォルダ内のファイル名リストを作成
    this.createContentsNameList();
    this.setHrefWithoutFileName();
    this.contents = [];
    for (let i = 0; i < this.contentsNameList.length; i++) {
      const content = this.createContentCard(this.contentsNameList[i]);

      //削除されていないコンテンツのみcontentsCardsに追加
      if (content.isDeleted == false) {
        this.contentsCards.push(content);
      }
    }
    this.sortContentsCards();
  }

  //コンテンツカードを作成（別のモジュールを使用する）
  createContentCard(contentName) {
    const targetContentCardPath = path.join(this.targetArtworkPath, contentName);
    return new contentCard(targetContentCardPath);
  }

  //作成したコンテンツカードリストを並べ替える
  sortContentsCards() {
    this.contentsCards.sort((a, b) => {
      const aFileBaseName = path.basename(a.contentPath);
      const bFileBaseName = path.basename(b.contentPath);
      if (parseInt(aFileBaseName) < parseInt(bFileBaseName)) {
        return -1;
      }
    });
  }

  //確認用ゲッタ
  getContentsCards() {
    return this.contentsCards;
  }

  //クライアントサイドのhrefで使用する。ファイル名を末尾につけてimgタグのsrcに使う
  setHrefWithoutFileName() {
    this.hrefWithoutFileName = `/artworks/${this.targetArtwork}/`;
  }

  getHrefWithoutFileName() {
    return this.hrefWithoutFileName;
  }

  //削除対象のコンテンツを削除する
  deleteContents(deleteContentsStrings) {
    const deleteContents = deleteContentsStrings.split(",");
    for (let i = 0; i < deleteContents.length; i++) {
      //最後尾は空になるためそれを除外
      if (deleteContents[i] == "") {
        continue;
      }
      //お気に入りの場合は削除しない
      if (deleteContents[i].includes("_fav")) {
        continue;
      }
      const basename = deleteContents[i].split(".")[0];
      const extname = deleteContents[i].split(".")[1];
      const oldDeleteContentPath = path.join(this.targetArtworkPath, deleteContents[i]);
      const newDeleteContentPath = path.join(this.targetArtworkPath, basename + "_deleted" + "." + extname);
      console.log("oldDeleteContentPath: " + oldDeleteContentPath);
      fs.renameSync(oldDeleteContentPath, newDeleteContentPath);
    }
  }

  //お気に入り対象のコンテンツをお気に入り登録or解除する
  addFavContents(addFavContentsStrings) {
    const addFavContents = addFavContentsStrings.split(",");
    for (let i = 0; i < addFavContents.length; i++) {
      //最後尾は空になるためそれを除外
      if (addFavContents[i] == "") {
        continue;
      }

      //fav_が含まれている場合は削除、含まれていない場合は追加
      let oldFileName = "";
      let newFileName = "";
      const basename = addFavContents[i].split(".")[0];
      const extname = addFavContents[i].split(".")[1];
      if (addFavContents[i].includes("_fav")) {
        oldFileName = addFavContents[i];
        newFileName = addFavContents[i].replace("_fav", "");
      } else {
        oldFileName = addFavContents[i];
        newFileName = basename + "_fav" + "." + extname;
      }

      const oldAddFavContentPath = path.join(this.targetArtworkPath, oldFileName);
      const newAddFavContentPath = path.join(this.targetArtworkPath, newFileName);
      console.log("oldAddFavContentPath: " + oldAddFavContentPath);
      fs.renameSync(oldAddFavContentPath, newAddFavContentPath);
      console.log("3: " + newAddFavContentPath);
    }
  }
}

module.exports = contentsManager;
