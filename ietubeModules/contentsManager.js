/* ietubeModules */
const fs = require("fs");
const path = require("path");
const contentCard = require("./contentCard");

class contentsManager {
  constructor(artworkName) {
    this.contentsCards = [];
    this.targetArtwork = artworkName;
    this.setTargetArtworkPath();
    this.createContentsNameList();
    this.setHrefWithoutFileName();
  }

  setTargetArtworkPath() {
    this.targetArtworkPath = path.join(__dirname, `../public/artworks/${this.targetArtwork}`);
  }

  //作品フォルダ内を読み取ってファイル名のリストを作成
  createContentsNameList() {
    this.contentsNameList = fs.readdirSync(this.targetArtworkPath);
  }

  //表示するべきコンテンツのリストを作成, getメソッドの時のみ使用
  createContentCardList() {
    this.contents = [];
    for (let i = 0; i < this.contentsNameList.length; i++) {
      const content = this.createContentCard(this.contentsNameList[i]);

      //削除されていないコンテンツのみcontentsCardsに追加
      if (content.isDeleted == false) {
        this.contentsCards.push(content);
      }
      this.sortContentsCards();
    }
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
      if (deleteContents[i] == "") {
        continue;
      }
      const oldDeleteContentPath = path.join(this.targetArtworkPath, deleteContents[i]);
      const newDeleteContentPath = path.join(this.targetArtworkPath, "deleted_" + deleteContents[i]);
      console.log("oldDeleteContentPath: " + oldDeleteContentPath);
      fs.renameSync(oldDeleteContentPath, newDeleteContentPath);
    }
  }

  //お気に入り対象のコンテンツをお気に入り登録or解除する
  addFavContents(addFavContentsStrings) {
    const addFavContents = addFavContentsStrings.split(",");
    for (let i = 0; i < addFavContents.length; i++) {
      if (addFavContents[i] == "") {
        continue;
      }

      //fav_が含まれている場合は削除、含まれていない場合は追加
      let oldFileName = "";
      let newFileName = "";
      if (addFavContents[i].includes("fav_")) {
        oldFileName = addFavContents[i];
        newFileName = addFavContents[i].replace("fav_", "");
      } else {
        oldFileName = addFavContents[i];
        newFileName = "fav_" + addFavContents[i];
      }

      const oldAddFavContentPath = path.join(this.targetArtworkPath, oldFileName);
      const newAddFavContentPath = path.join(this.targetArtworkPath, newFileName);
      console.log("oldAddFavContentPath: " + oldAddFavContentPath);
      fs.renameSync(oldAddFavContentPath, newAddFavContentPath);
    }
  }
}

module.exports = contentsManager;
