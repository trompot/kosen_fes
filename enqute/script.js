// $(function() {
//     $.ajax({
//       async: true,
//       cache: false,
//       timeout: 10000,
//       type: "GET",
//       url: "question.json"
//     })
//       .done(function(data, textStatus, jqXHR) {
//         // responseをjsonに
//         // var response = JSON.parse(data);
//         // var response = data;
//         initVue(data);
//       })
//       .fail(function(jqXHR, textStatus, errorThrown) {
//         alert("通信に失敗しました。");
//       })
//       .always(function() {});
// });

(function (handleload) {
  var xhr = new XMLHttpRequest;

  xhr.addEventListener('load', handleload, false);
  xhr.open('GET', 'https://trompot.github.io/kosen_fes/enqute/question.json', true);
  xhr.send(null);
}(function handleLoad (event) {
  var xhr = event.target,
      obj = JSON.parse(xhr.responseText);
      // console.log(obj.shop);
      initVue(obj);
}));
function initVue(data) {
    // 1日目と2日目の問題切り替え
    var now = new Date();
    var key = "question1";

    if (now.getDate() == 4){
        key = "question2";
    }
    new Vue({
      el: "#question",
      data: {
        question: data[key]
      }
    });
  }
  