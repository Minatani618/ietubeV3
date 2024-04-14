/* contentsList クライアントサイドjavascript */

/* metaDiv */
const metaDivFileNames = document.getElementById("metaDivFileNames");
const contentFileNames = metaDivFileNames.getElementsByClassName("metaFileName");
const pageNumber = document.getElementById("metaPageNumber");
const displayNumberPerPage = document.getElementById("metaDisplayNumberPerPage");
const hrefWithoutFileName = document.getElementById("metaHrefWithoutFileName");
const selectedList = document.getElementById("selectedList");
const colNumber = document.getElementById("metaColNumber");

const contentDisplayContainer = document.getElementById("contentDisplayContainer");

//ボタン
const column1button = document.getElementById("column1button");
const column2button = document.getElementById("column2button");
const column3button = document.getElementById("column3button");
const contentsCount20button = document.getElementById("contentsCount20button");
const contentCount50button = document.getElementById("contentsCount50button");
const contentsCount100button = document.getElementById("contentsCount100button");
const switchButton = document.getElementById("switchButton");
const deleteButton = document.getElementById("deleteButton");
const addFavButton = document.getElementById("addFavButton");

//移動ボタン 画面上部と下部に複数配置しているため配列で取得
const prevButtons = document.getElementsByClassName("prevButton");
const nextButtons = document.getElementsByClassName("nextButton");

//表示するページを管理するクラス
class contentsManager {
  constructor(pageNumber, displayNumberPerPage, hrefWithoutFileName, contentFileNames) {
    this.pageNumber = pageNumber;
    this.displayNumberPerPage = displayNumberPerPage;
    this.hrefWithoutFileName = hrefWithoutFileName;
    this.setContentFileNames(contentFileNames);
    this.setDisplayRange();
  }

  setContentFileNames(contentFileNames) {
    this.contentFileNames = [];
    for (let i = 0; i < contentFileNames.length; i++) {
      this.contentFileNames.push(contentFileNames[i].textContent);
    }
  }

  setDisplayRange() {
    this.displayRange = {
      start: (this.pageNumber - 1) * this.displayNumberPerPage,
      end: this.pageNumber * this.displayNumberPerPage,
    };
  }

  displayImgs() {
    for (let i = this.displayRange.start; i < this.displayRange.end; i++) {
      this.createContentImg(this.contentFileNames[i]);
    }
  }

  //img要素を作成してコンテナに追加
  createContentImg(fileName) {
    const imgDiv = document.createElement("div");
    imgDiv.className = "contentImgDiv";
    const img = document.createElement("img");
    img.src = this.hrefWithoutFileName + fileName;
    imgDiv.appendChild(img);
    imgDiv.onclick = () => addSelectClass(imgDiv);
    contentDisplayContainer.appendChild(imgDiv);
  }

  //コンテンツ表示コンテナを初期化
  initDisplayContainer() {
    while (contentDisplayContainer.firstChild) {
      contentDisplayContainer.removeChild(contentDisplayContainer.firstChild);
    }
  }
}

// ↓【イベントリスナ用】-----------------------------------------------------------
//【イベントリスナ用】列数を変更 ボタンにイベントリスナーを追加
const changeColumnNumber = (column) => {
  //引数に与えられた値によって画像の幅を変更(単純に割合で変更するとうまくいかないためswitch文で分岐)
  let imgWidth = 0;
  switch (column) {
    case (column = 1):
      imgWidth = 95;
      break;
    case (column = 2):
      imgWidth = 45;
      break;
    case (column = 3):
      imgWidth = 30;
      break;
    default:
      break;
  }

  //コンテナ内のimg要素すべてのstyleを順に変更
  const img = contentDisplayContainer.getElementsByTagName("div");
  for (let i = 0; i < img.length; i++) {
    img[i].style.width = `${imgWidth}vw`;
  }

  //metaDivに新しい設定値をセット
  colNumber.textContent = column;
};

//【イベントリスナ用】imgに選択クラスを追加
const addSelectClass = (img) => {
  img.classList.toggle("selected");
};

//【イベントリスナ用】selectedクラスを持つimgを管理用divにまとめる
const listSelectedImgs = () => {
  const selectedImgDiv = contentDisplayContainer.getElementsByClassName("selected");
  for (let i = 0; i < selectedImgDiv.length; i++) {
    const selectedImgSrc = selectedImgDiv[i].getElementsByTagName("img")[0].src;
    console.log(selectedImgSrc);
    const selectedImgFileName = selectedImgSrc.split("/").pop();
    const p = document.createElement("p");
    p.textContent = selectedImgFileName;
    selectedList.appendChild(p);
  }
};
// ↑ 【イベントリスナ用】----------------------------------------------------------

//ページ数と1ページあたりの表示数を指定して表示を更新
const updateDisplay = (dnpp, pn) => {
  //metaDivに新しい設定値をセット
  displayNumberPerPage.textContent = dnpp;
  pageNumber.textContent = pn;

  //metaDivの新設定値をもとに対応するコンテンツを表示する
  const manager = new contentsManager(pageNumber.textContent, displayNumberPerPage.textContent, hrefWithoutFileName.textContent, contentFileNames);
  manager.initDisplayContainer();
  manager.displayImgs();

  //列数を更新
  changeColumnNumber(parseInt(colNumber.textContent));

  //移動ボタンに新しい設定値をもとにしたイベントリスナーを追加
  setFunctionToMoveButtons();
};

//移動ボタンにイベントリスナーを追加
const setFunctionToMoveButtons = () => {
  const dnpp = parseInt(displayNumberPerPage.textContent);
  const pn = parseInt(pageNumber.textContent);

  //前へボタンにイベントリスナーを追加
  for (let i = 0; i < prevButtons.length; i++) {
    prevButtons[i].onclick = () => updateDisplay(dnpp, pn - 1);
  }

  //次へボタンにイベントリスナーを追加
  for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].onclick = () => updateDisplay(dnpp, pn + 1);
  }
};

//metaDivから設定値を取得
const currentPageNumber = parseInt(pageNumber.textContent);
const currentDisplayNumberPerPage = parseInt(displayNumberPerPage.textContent);

//列ボタンにイベントリスナーを追加
column1button.onclick = () => changeColumnNumber(1);
column2button.onclick = () => changeColumnNumber(2);
column3button.onclick = () => changeColumnNumber(3);

//1ページあたりの表示数ボタンにイベントリスナーを追加
contentsCount20button.onclick = () => updateDisplay(20, currentPageNumber);
contentCount50button.onclick = () => updateDisplay(50, currentPageNumber);
contentsCount100button.onclick = () => updateDisplay(100, currentPageNumber);

//機能ボタンにイベントリスナーを追加
switchButton.onclick = () => listSelectedImgs();

//初期表示
updateDisplay(currentDisplayNumberPerPage, currentPageNumber);
