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

function ok() {
  console.log(remaining_days());
}

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

function initVue(data) {
  new Vue({
    el: "#page",
    data: {
      depart: data["department"],
      exhibition: data["other"],
      food: data["food"],
      plan: data["plan"]
    }
  });
}

// 開閉バー
$(function() {
  $("#menuBarOpen").click(function() {
    $(this).toggleClass("menuBarNo");
    $("#menuBarColse").toggleClass("menuBarNo");
  });
  $("#menuBarColse").click(function() {
    $(this).toggleClass("menuBarNo");
    $("#menuBarOpen").toggleClass("menuBarNo");
  });
});
