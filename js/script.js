// 高専祭までの日数
function remaining_days() {
  // 高専祭の日付
  var event = new Date("2018-11-3");

  // 今日の日付
  var now = new Date();

  // 日付差分
  var diff = event.getTime() - now.getTime();
  // 日数変換
  var day = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 残り日数返す
  switch (true) {
    case day < -1:
      return -1;
    case day < 1:
      return 0;
    default:
      return day;
  }
}

function setPage() {
  $(function() {
    $.ajax({
      async: true,
      cache: false,
      timeout: 10000,
      type: "GET",
      url: "json/main.json"
    })
      .done(function(data, textStatus, jqXHR) {
        // responseをjsonに
        // var response = JSON.parse(data);
        // var response = data;
        console.log(data["department"][0]);
        initVue(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("通信に失敗しました。");
      })
      .always(function() {});
  });
}

function initVue(data) {
  new Vue({
    el: "#page",
    data: {
      fes: data["fes"],
      depart: data["department"],
      exhibition: data["other"],
      food: data["food"],
      plan: data["plan"],
      committee: data["committee"],
      night: data["night"]
    }
  });
}

// 開閉バー
$(function() {
  $("#menu-bar-o").click(function() {
    $("#menu").toggleClass("menuBarNo");
  });
  $(".menu-list").click(function() {
    $("#menu").removeClass("menuBarNo");
  });
});

$(document).ready(function() {
  $("#menu-bar a").click(function(event) {
    $("#menu-bar").collapse("hide");
  });
});

// ブラウザ判定
$(function() {
  var userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
    $(".body").remove();
    $("html").append(
      '<div style="text-align: center; margin-top: 55px;"><h1>IEではこのサイトを閲覧することができません</h1><br>',
      '<div style="text-align: center; margin-top: 55px;"><h3>You can\'t access this site by IE.</h3><br>'
    );
    $("html").append(
      '<div style="text-align: center; margin-top: 55px;"><h3>動作保証環境: Edge / Chrome / FireFox</h3></div>'
    );
    $("head").remove();
  } else {
    setPage();
  }
});

// ページ一覧
var page = [
  "top",
  "fes",
  "about",
  "committee",
  "depart_exhibition",
  "exhibition",
  "food",
  "plan",
  "access"
];

// CTFらないCTF
// 高専祭の後夜祭を表示するためのプログラム
$(document).click(function(event) {
  if ($(location)[0]["hash"] == "#night_fes") {
    for (var i = 0; i < page.length; i++) {
      $("#" + page[i]).css("display", "none");
    }
    $("#nigth_fes").css("display", "");

    $(".menu").css("display", "none");
  } else {
    for (var i = 0; i < page.length; i++) {
      $("#" + page[i]).css("display", "");
    }
    $("#nigth_fes").css("display", "none");
    $(".menu").css("display", "");
  }
});

// メニューバーを押したらリンク先に飛ぶ
$(".menu-list").click(function(event) {
  for (var i = 0; i < page.length; i++) {
    var link = event.target.baseURI.split("#")[1];
    if (link == page[i]) {
      location.href = "#" + link;
      $("#menu-bar").collapse("hide");
    }
  }
  $(".menu").css("display", "");
  $("#nigth_fes").css("display", "none");
});
