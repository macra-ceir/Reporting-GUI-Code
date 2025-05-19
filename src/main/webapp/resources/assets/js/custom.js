$(".close").click(function() {
        $(this).closest('.modal').removeAttr("style");
    });

$(document).ready(function () {
  $(".select-row:checkbox").change(function () {
    $(this).parent().parent().parent().toggleClass("trselected");
  });
});

const rightBtn = document.querySelector("#slide-right");
const leftBtn = document.querySelector("#slide-left");

rightBtn.addEventListener("click", function (event) {
  const conent = document.querySelector("#slide-content");
  conent.scrollLeft += 90;
  event.preventDefault();
});

leftBtn.addEventListener("click", function (event) {
  const conent = document.querySelector("#slide-content");
  conent.scrollLeft -= 90;
  event.preventDefault();
});    