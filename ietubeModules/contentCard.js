/* ietubeModules */
const fs = require("fs");
const path = require("path");

class contentCard {
  constructor(contentPath) {
    this.contentPath = contentPath;
    this.setFileName();
    this.extractArtworkName();
    this.setProperties();
  }

  setFileName = () => {
    this.fileName = path.basename(this.contentPath);
  };

  //アートワーク名(フォルダ名)を抽出
  extractArtworkName = () => {
    const folderPath = path.dirname(this.contentPath);
    const folderName = path.basename(folderPath);
    this.artworkName = folderName;
  };

  //削除フラグとお気に入りフラグを設定（サーバーサイド使用）
  setProperties = () => {
    this.isDeleted = this.fileName.includes("deleted");
    this.isFavorite = this.fileName.includes("favorite");
  };
}

module.exports = contentCard;
