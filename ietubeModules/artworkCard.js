const path = require("path");
const fs = require("fs");

class artworkCard {
  constructor(folderName) {
    this.artworkName = folderName;
    this.setArtworksFolderPath(folderName);
    this.setArtworkHref();
    this.setArtworkImgSrc();
    this.setArtworksFileNames();
    this.setContentsCount();
    this.setThumbnails();
  }

  //artworksフォルダを指定
  setArtworksFolderPath(folderName) {
    this.artworksFolderPath = path.join(__dirname, "..", "public", "artworks", folderName);
  }

  //ejsに記述するaタグのhref
  setArtworkHref() {
    this.artworksHref = `/ArtworkGallery/ContentsList/${this.artworkName}`;
  }

  //ejsに記述するimgタグのsrcに使用
  setArtworkImgSrc() {
    this.artworkImgSrc = `/artworks/${this.artworkName}`;
  }

  //artworksフォルダ内の画像ファイル名を取得
  setArtworksFileNames() {
    this.artworksFileNames = fs.readdirSync(this.artworksFolderPath);
  }

  //削除されていない画像ファイル数を取得
  setContentsCount() {
    this.contentsCount = 0;
    for (let i = 0; i < this.artworksFileNames.length; i++) {
      //削除画像を飛ばす
      if (this.artworksFileNames[i].includes("deleted")) {
        continue;
      }
      this.contentsCount++;
    }
  }

  //artworkのサムネイルをセットする
  setThumbnails() {
    this.thumbnails = []; //サムネイルとしてギャラリーに表示する５枚の画像をセットする配列
    //お気に入り画像があれば配列の先頭に順に追加
    //ファイルループ
    for (let i = 0; i < this.artworksFileNames.length; i++) {
      //削除されている画像はスキップ
      if (this.artworksFileNames[i].includes("deleted")) {
        continue;
      }

      //お気に入り画像があれば配列の先頭に順に追加
      if (this.artworksFileNames[i].includes("fav")) {
        this.thumbnails.push(this.artworkImgSrc + "/" + this.artworksFileNames[i]);
      }

      //おきにいり画像が５枚になったらメソッド終了
      if (this.thumbnails.length === 5) {
        return;
      }
    }

    for (let i = 0; i < this.artworksFileNames.length; i++) {
      //削除されている画像はスキップ
      if (this.artworksFileNames[i].includes("deleted")) {
        continue;
      }

      //お気に入り画像がなければ配列に追加
      this.thumbnails.push(this.artworkImgSrc + "/" + this.artworksFileNames[i]);
      //サムネイルが５枚になったらメソッド終了
      if (this.thumbnails.length === 5) {
        return;
      }
    }
  }

  getThumbnails() {
    return this.thumbnails;
  }
}

module.exports = artworkCard;
