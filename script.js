 HEAD

// --- 画面の id をまとめておく（タイプミスを防ぐ） ---
var SCREENS = {
    HOME: "screen-home",
    DETAIL: "screen-detail",
    LISTING: "screen-listing",
    CART: "screen-cart",
    CONFIRMED: "screen-confirmed",
  };
  
  // CSS で「今表示中」の画面に付けるクラス名
  var ACTIVE_CLASS = "screen--active";
  
  // ------------------------------------------------------------
  // 1) showScreen — メインの画面切り替え関数
  // ------------------------------------------------------------
  
  function showScreen(screenId) {
    // ページ内の「画面」section をすべて取得
    var allScreens = document.querySelectorAll(".screen");
  
    // ① まず全部から「表示中」クラスを外す → CSS で非表示になる
    var i;
    for (i = 0; i < allScreens.length; i++) {
      allScreens[i].classList.remove(ACTIVE_CLASS);
    }
  
    // ② 指定された id の画面だけ「表示中」クラスを付ける
    var nextScreen = document.getElementById(screenId);
    if (nextScreen) {
      nextScreen.classList.add(ACTIVE_CLASS);
      // 画面が変わったら上までスクロール（スマホで見やすくする）
      window.scrollTo(0, 0);
    }
  }
  
  // ------------------------------------------------------------
  // 2) wireButton — 1つのボタンにクリック動作を付ける
  // ------------------------------------------------------------
  // buttonId = HTML の id（例: "btn-shop-now"）
  // screenId = 行き先の画面 id（例: SCREENS.LISTING）
  function wireButton(buttonId, screenId) {
    var button = document.getElementById(buttonId);
    if (!button) {
      return; // ボタンが HTML に無いときは何もしない（エラーで止めない）
    }
    button.addEventListener("click", function () {
      showScreen(screenId);
    });
  }
  
  // ------------------------------------------------------------
  // 3) wireButtonsByClass — 同じ class のボタンをまとめて配線
  // ------------------------------------------------------------
  // 例: ホームの「View」が2つある → class 名で一度に設定
  function wireButtonsByClass(className, screenId) {
    var buttons = document.getElementsByClassName(className);
    var j;
    for (j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener("click", function () {
        showScreen(screenId);
      });
    }
  }
  
  // ------------------------------------------------------------
  // 4) scrollToOrderedItems — 注文完了画面の「商品一覧」へスクロール
  // ------------------------------------------------------------
  function scrollToOrderedItems() {
    var heading = document.getElementById("ordered-items-heading");
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  
  // ------------------------------------------------------------
  // 5) initApp — ページ読み込み後に、すべてのボタンをつなぐ
  // ------------------------------------------------------------
  function initApp() {
    // --- 課題で指定されたナビゲーション ---
  
    // ホーム「Shop now」→ 商品一覧
    wireButton("btn-shop-now", SCREENS.LISTING);
  
    // ヘッダーのカートアイコン → カート
    wireButton("btn-header-cart", SCREENS.CART);
  
    // ホームのおすすめ「View」→ 商品詳細（ボタンが2つ）
    wireButtonsByClass("btn-view-featured", SCREENS.DETAIL);
  
    // 商品詳細「Add to cart」→ カート
    wireButton("btn-add-cart", SCREENS.CART);
  
    // 詳細画面の「You may also like」の View → 商品詳細のまま
    wireButtonsByClass("btn-view-detail", SCREENS.DETAIL);
  
    // カート「Checkout」→ 注文完了
    wireButton("btn-checkout", SCREENS.CONFIRMED);
  
    // 注文完了「Continue Shopping」→ ホーム
    wireButton("btn-continue", SCREENS.HOME);
  
    // 注文完了「View Order」→ 同じ画面内の注文商品リストへスクロール
    var viewOrderBtn = document.getElementById("btn-view-order");
    if (viewOrderBtn) {
      viewOrderBtn.addEventListener("click", scrollToOrderedItems);
    }
  }
  
  // ページの HTML が読み終わったら initApp を実行
  document.addEventListener("DOMContentLoaded", initApp);
  
 