const fs = require("fs");
const path = require("path");

function deleteEmptyDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    if (files.length === 0) {
      // ディレクトリが空の場合、削除する
      fs.rmdir(directoryPath, (err) => {
        if (err) {
          console.error("Error deleting directory:", err);
          return;
        }
        console.log("Empty directory deleted successfully:", directoryPath);
      });
    } else {
      console.log("Directory is not empty:", directoryPath);
    }
  });
}

/* const artworksPath = "C:\\Users\\minat\\Documents\\ietubeV3\\public\\artworks"; */
const artworksPath = "\\\\ms\\Users\\minatani\\Documents\\ietubeV3\\public\\artworks";
const artworks = fs.readdirSync(artworksPath);

for (let i = 0; i < artworks.length; i++) {
  const targetArtwork = path.join(artworksPath, artworks[i]);
  const contents = fs.readdirSync(targetArtwork);
  for (let j = 0; j < contents.length; j++) {
    const contentPath = path.join(targetArtwork, contents[j]);
    deleteEmptyDirectory(contentPath);
  }
}
