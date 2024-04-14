// div要素a内のimgタグを取得
var imgElement = document.getElementById("A").getElementsByTagName("img")[0];

imgElement.onclick = moveImg;

function moveImg() {
  // div要素bにimgタグを追加
  document.getElementById("B").appendChild(imgElement);
  console.log("imgElementをdivBに移動しました。");
}
