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
}

module.exports = contentsManager;
