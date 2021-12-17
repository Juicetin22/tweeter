//ensure that the webpage gets loaded before running the script
$(document).ready(() => {
  
  //event listener for any changes or input in the form textbox
  $("#tweet-text").on("input", function() {
    //every time the event occurs, want to determine the current count of characters left
    let counter = 140 - $(this).val().length;
    
    //if counter is less than 0, we want to add a class to the counter node that makes the number red (seen in css stylesheet new-tweet.css)
    if (counter < 0) {
      //traversing through the DOM starting from the textbox node
      $(this).parent().next().children().next().text(counter).addClass("negative-num")
    } else {
      //if counter is above 0, then remove the class that turns the number red
      $(this).parent().next().children().next().text(counter).removeClass("negative-num");
    }
  });

});