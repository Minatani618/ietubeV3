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
    this.createContentCardList();
    this.setHrefWithoutFileName();
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
    this.contents = [];
    for (let i = 0; i < this.contentsNameList.length; i++) {
      const content = this.createContentCard(this.contentsNameList[i]);

      //削除されていないコンテンツのみcontentsCardsに追加
      if (content.isDeleted == false) {
        this.contentsCards.push(content);
      }
    }
  }

  //コンテンツカードを作成（別のモジュールを使用する）
  createContentCard(contentName) {
    const targetContentCardPath = path.join(this.targetArtworkPath, contentName);
    return new contentCard(targetContentCardPath);
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
}

module.exports = contentsManager;
