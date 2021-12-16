$(document).ready(() => {
  
  $("#tweet-text").on("input", function() {
    let counter = 140 - $(this).val().length;
    
    if (counter < 0) {
      $(this).parent().next().children().next().text(counter).addClass("negative-num")
    } else {
      $(this).parent().next().children().next().text(counter).removeClass("negative-num");
    }
  });

});