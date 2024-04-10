const path = require("path");
const fs = require("fs");

class GalleryManager {
  constructor() {
    this.setArtworkFolderPath();
    this.setArtworkList();
    this.sortArtworkList();
    this.setArtworkDisplayList(10);
  }

  setArtworkFolderPath() {
    this.artworkFolderPath = path.join(__dirname, "..", "public", "artworks");
  }

  setArtworkList = () => {
    this.artworkList = fs.readdirSync(this.artworkFolderPath);
  };

  getArtworkList = () => {
    return this.artworkList;
  };

  sortArtworkList = () => {
    this.artworkList.sort((a, b) => {
      return a - b;
    });
  };

  //何ページにどの作品を表示するかを表す二次元配列を作成
  setArtworkDisplayList = (numberOfArtworksPerPage) => {
    this.artworkDisplayList = [];
    for (let i = 0; i < this.artworkList.length; i++) {
      if (i % numberOfArtworksPerPage === 0) {
        this.artworkDisplayList.push([]);
      }
      const pageNumber = this.determinePageNumber(i, numberOfArtworksPerPage);
      this.artworkDisplayList[pageNumber - 1].push(this.artworkList[i]);
    }
  };

  getArtworkDisplayList = () => {
    return this.artworkDisplayList;
  };

  //その作品が何ページ目に表示されるかを返す
  determinePageNumber = (ArtworksNumber, numberOfArtworksPerPage) => {
    return Math.floor(ArtworksNumber / numberOfArtworksPerPage) + 1;
  };
}

module.exports = GalleryManager;
