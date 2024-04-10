const path = require("path");
const fs = require("fs");

class artworkCard {
  constructor() {}

  //artworksフォルダを指定
  setArtworksFolderPath(folderName) {
    this.artworksFolderPath = path.join(__dirname, "..", "public", "artworks", folderName);
  }

  //artworksフォルダ内の画像ファイル名を取得
  getArtworks() {
    this.artworksfileNames = fs.readdirSync(this.artworksFolderPath);
  }

  //削除されていない画像ファイル数を取得
  setContentsCount() {
    this.contentsCount = 0;
    for (let i = 0; i < this.artworksfileNames.length; i++) {
      //削除画像を飛ばす
      if (this.artworksfileNames[i].includes("deleted")) {
        continue;
      }
      this.contentsCount++;
    }
  }

  //artworkのサムネイルをセットする
  setThumbnails() {
    this.getArtworks(); //artworksフォルダ内の画像ファイル名を取得
    this.thumbnails = []; //サムネイルとしてギャラリーに表示する５枚の画像をセットする配列
    //お気に入り画像があれば配列の先頭に順に追加
    //ファイルループ
    for (let i = 0; i < this.artworksfileNames.length; i++) {
      //削除されている画像はスキップ
      if (this.artworksfileNames[i].includes("deleted")) {
        continue;
      }

      //お気に入り画像があれば配列の先頭に順に追加
      if (this.artworksfileNames[i].includes("favorite")) {
        this.thumbnails.push(this.favoriteArtworks[i]);
      }

      //おきにいり画像が５枚になったらメソッド終了
      if (this.thumbnails.length === 5) {
        return;
      }
    }

    for (let i = 0; i < this.artworksfileNames.length; i++) {
      //削除されている画像はスキップ
      if (this.artworksfileNames[i].includes("deleted")) {
        continue;
      }

      //お気に入り画像がなければ配列に追加
      this.thumbnails.push(this.artworksfileNames[i]);
      //サムネイルが５枚になったらメソッド終了
      if (this.thumbnails.length === 5) {
        return;
      }
    }
  }
}

module.exports = artworkCard;
