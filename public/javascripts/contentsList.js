/* contentsList クライアントサイドjavascript */

/* metaDiv */
const metaDivFileNames = document.getElementById("metaDivFileNames");
const contentFileNames = metaDivFileNames.getElementsByClassName("metaFileName");
const pageNumber = document.getElementById("metaPageNumber");
const displayNumberPerPage = document.getElementById("metaDisplayNumberPerPage");
const hrefWithoutFileName = document.getElementById("metaHrefWithoutFileName");
/* const selectedList = document.getElementById("selectedList"); */
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
      if (this.contentFileNames[i] !== undefined) {
        this.createContentImg(this.contentFileNames[i]);
      }
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
const addSelectClass = (imgDiv) => {
  imgDiv.classList.toggle("selected");
};

//【イベントリスナ用】selectedクラスを持つ者と持たないもので入れ替える
const switchSelectedImgs = () => {
  const selectedImgDiv = contentDisplayContainer.getElementsByTagName("div");
  for (let i = 0; i < selectedImgDiv.length; i++) {
    console.log(selectedImgDiv[i]);
    selectedImgDiv[i].classList.toggle("selected");
  }
};

//【イベントリスナ用】selectedクラスを持つ者を削除
const deleteSelectedContents = async (event) => {
  event.preventDefault(); // ボタンを押したときのデフォルトのフォーム送信を防ぐ
  const selectedContents = await listSelectedImgs();

  //input要素作成追加
  const deleteInput = document.createElement("input");
  deleteInput.name = "delete";
  deleteInput.value = selectedContents;
  deleteInput.type = "hidden";
  const deleteForm = document.getElementById("deleteForm");
  deleteForm.appendChild(deleteInput);

  //POST送信
  deleteForm.submit();
};

//【イベントリスナ用】selectedクラスを持つ者をお気に入り登録
const addFavSelectedContents = async (event) => {
  event.preventDefault(); // ボタンを押したときのデフォルトのフォーム送信を防ぐ
  const selectedContents = await listSelectedImgs();

  //input要素作成追加
  const addFavInput = document.createElement("input");
  addFavInput.name = "addFav";
  addFavInput.value = selectedContents;
  addFavInput.type = "hidden";
  const addFavForm = document.getElementById("addFavForm");
  addFavForm.appendChild(addFavInput);

  //POST送信
  addFavForm.submit();
};

//【イベントリスナ用】selectedクラスを持つdiv内のimgのsrcファイル名をリスト化して文字列として返す
const listSelectedImgs = () => {
  return new Promise((resolve, reject) => {
    const selectedImgDiv = contentDisplayContainer.getElementsByClassName("selected");
    let selectedListStrings = "";
    for (let i = 0; i < selectedImgDiv.length; i++) {
      const selectedImgSrc = selectedImgDiv[i].getElementsByTagName("img")[0].src;
      const selectedImgFileName = selectedImgSrc.split("/").pop();
      selectedListStrings += selectedImgFileName + ",";
    }
    resolve(selectedListStrings);
  });
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
switchButton.onclick = () => switchSelectedImgs();
deleteButton.onclick = (event) => deleteSelectedContents(event);
addFavButton.onclick = (event) => addFavSelectedContents(event);

//初期表示
updateDisplay(currentDisplayNumberPerPage, currentPageNumber);
