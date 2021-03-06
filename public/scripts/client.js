//shorthand for document.ready; want the script to run after the page is loaded
$(() => {

  //function for creating a tweet from the user info object; these new tweets will have classes that will allow them to be stylized as per our css stylesheets
  const createTweetElement = (tweet) => {
    //start with creating an article tag and then gradually include each child and following subnodes, making sure to add in information from the user object data
    const $tweet = $("<article class='unique-tweet'></article>");
    const $tweetHeader = $("<header class='tweet-head'></header>");
    const $tweetName = $(`<p class="user"><img src=${tweet.user.avatars}>&nbsp&nbsp${tweet.user.name}</p>`);
    const $tweetHandle = $(`<p class="handle">${tweet.user.handle}</p>`);
    //note that we changed this node to use .text() instead of a template literal to prevent cross-site scripting since it uses user input data from form!
    const $tweetBody = $(`<p class="tweet-middle">`).text(tweet.content.text);
    const $tweetFooter = $("<footer class='tweet-foot'></footer>");
    const $tweetDate = $(`<p>${timeago.format(tweet.created_at)}</p>`);
    //create a div that contains the flag, retweet, and like icons
    const $tweetImages = $("<div class='images'><i class='fas fa-flag'></i><i class='fas fa-retweet'></i><i class='fas fa-heart'></i></div>");
   
    //we want to then combine them correctly to make the desired tree structure
    $tweetHeader.append($tweetName, $tweetHandle);
    $tweetFooter.append($tweetDate, $tweetImages);
    //this combines all of substructures to the article tag, which is the container for each individual tweet
    $tweet.append($tweetHeader, $tweetBody, $tweetFooter);

    return $tweet;
  };

  //want to create a function that takes an array of tweets (in object form) and adds it to our main tweet container
  const renderTweets = (tweets) => {
    //every time we run this function, we want to have a sort of 'loading point' for the tweet-container or it will continually add on tweets already in the container
    $("#tweets-container").empty();
    //want to go through the array of tweet objects
    for (const tweet of tweets) {
      //for each tweet object, we want to create the tweet element (structured like in the html)
      const $tweet = createTweetElement(tweet);
      //and add it to the main tweets container
      $("#tweets-container").prepend($tweet);
    }
  };

  //listen for a submit event
  $("#tweet-submit").on("submit", function(event) {
    //prevent submit to go to another page, as it normally does
    event.preventDefault();
    //remove error message node each time submit button is clicked so the errors don't chain after each submit
    $(".error").remove();

    //if the number of characters in the textbox is equal to 0, ie. textbox is empty, prevent submission and alert user
    if ($("#tweet-text").val().length === 0) {
      //add a new child to the new-tweet container, containing the error message for empty tweet
      $(".new-tweet").append($(`<p class="error">?????? <b>Cannot post an empty tweet!</b> ??????</p>`));
      const $error = $(".error");
      //stop the function and have the error message appear
      return $error.hide().slideDown(250);
    
      //if number of characters in the textbox is > 140, prevent submission of tweet and alert user
    } else if ($("#tweet-text").val().length > 140) {
      //add a new child to the new-tweet container, containing the error message for max characters limit
      $(".new-tweet").append($(`<p class="error">?????? <b>Exceeds the maximum allowed number of characters!</b> ??????</p>`));
      const $error = $(".error");
      return $error.hide().slideDown(250);
    }
    
    //converts the form data into a query string as the server is configured to take query strings
    const serialized = $(this).serialize();

    //shorthand AJAX post request to where the tweets are stored
    $.post("/tweets", serialized, (response) => {
      //want to clear the textbox after posting
      $("#tweet-text").val("");
      //want to set counter back to max limit after posting
      $(".counter").text(140);
      //want to load the tweets on the webpage again and see that the submitted tweet gets posted (without refreshing the page)  
      loadTweets();
    });
  });

  //function to load the tweets onto the web browser
  const loadTweets = () => {
    //AJAX get request to the server, handling a json response
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      //if the request goes through, pass the data retrieved through the renderTweet function to render them to the DOM
      success: (tweets) => {
        console.log("data", tweets);
        renderTweets(tweets);
      },
      //if the request has an issue or is unsuccessful, print an error message
      error: (err) => {
        console.log("error:", err);
      } 
    });
  };
  //call the function to load up the tweets on the webpage
  loadTweets();

});