const path = require("path");

class artworkCad {
  constructor() {}

  //artworksフォルダを指定
  setArtworksFolderPath(folderName) {
    this.artworksFolderPath = path.join(__dirname, "..", "public", "artworks", folderName);
  }

  //artworkのサムネイルをセットする
  setThumbnails(thumbnails) {
    this.thumbnails = []; //サムネイルとしてギャラリーに表示する５枚の画像をセットする処理を書く
  }

  setArtwork(img, title, artist, album) {
    this.artworkImg.src = img;
    this.artworkTitle.textContent = title;
    this.artworkArtist.textContent = artist;
    this.artworkAlbum.textContent = album;
  }
}

module.exports = artworkCad;
