/* ietubeModules */
const fs = require("fs");
const path = require("path");

class contentCard {
  constructor(contentPath) {
    this.contentPath = contentPath;
    this.setFileName();
    this.extractArtworkName();
    this.setProperties();
    this.setFileType();
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

  //拡張子によってファイルタイプを設定
  setFileType = () => {
    const ext = path.extname(this.contentPath);
    switch (ext) {
      case ".jpg":
        this.fileType = "image";
        break;
      case ".png":
        this.fileType = "image";
        break;
      case ".gif":
        this.fileType = "image";
        break;
      case ".webp":
        this.fileType = "image";
        break;
      case "jpeg":
        this.fileType = "image";
        break;
      case "JPG":
        this.fileType = "image";
        break;
      case "PNG":
        this.fileType = "image";
        break;
      case "JPEG":
        this.fileType = "image";
        break;
      case ".mp4":
        this.fileType = "video";
        break;
      case ".mov":
        this.fileType = "video";
        break;
      default: //それ以外のものは画像として扱う
        this.fileType = "image";
        break;
    }
  };
}

module.exports = contentCard;
