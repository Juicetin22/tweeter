/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  //sample data to use for testing
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //function for creating a tweet from the user info object; these new tweets will have classes that will allow them to be stylized as per our css stylesheets
  const createTweetElement = (tweet) => {
    //start with creating an article tag
    const $tweet = $("<article class='unique-tweet'></article>");
    //followed by the first child of the article tag
    const $tweetHeader = $("<header class='tweet-head'></header>");
    //name and handle are children of the header tag
    const $tweetName = $(`<p class="user"><img src=${tweet.user.avatars}>&nbsp&nbsp${tweet.user.name}</p>`);
    const $tweetHandle = $(`<p class="handle">${tweet.user.handle}</p>`);
    //next is the middle of the article(child of article)
    const $tweetBody = $(`<p class="tweet-middle">${tweet.content.text}</p>`);
    //followed by a footer tag(child of article)
    const $tweetFooter = $("<footer class='tweet-foot'></footer>");
    //date and images are children of the footer tag
    const $tweetDate = $(`<p>${timeago.format(tweet.created_at)}</p>`);
    //create a div that contains the flag, retweet, and heart icons
    const $tweetImages = $("<div class='images'><i class='fas fa-flag'></i><i class='fas fa-retweet'></i><i class='fas fa-heart'></i></div>");
    //the following i tags pertain to images that are children of the footer tag
    // const $tweetImageOne = $('<i class="fas fa-flag"></i>');
    // const $tweetImageTwo = $('<i class="fas fa-retweet"></i>');
    // const $tweetImageThree = $('<i class="fas fa-heart"></i>');
    
    // //we want to then combine them to make the desired tree structure
    // $tweetImages.append($tweetImageOne, $tweetImageTwo, $tweetImageThree);
    $tweetHeader.append($tweetName, $tweetHandle);
    $tweetFooter.append($tweetDate, $tweetImages);
    //this combines all of substructures to the article tag, which is the container for each individual tweet
    $tweet.append($tweetHeader, $tweetBody, $tweetFooter);

    //we want to return this combined tweet
    return $tweet;
  };

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  // $("#tweets-container").append($tweet);

  //want to create a function that takes an array of tweets (in object form) and adds it to our main tweet container
  const renderTweets = (tweets) => {
    //every time we run this function, we want to have a sort of 'loading point' for the tweet-container or it will continually add on tweets already in the container
    const $tweetsContainer = $("#tweets-container");

    //want to go through the array of tweet objects
    for (const tweet of tweets) {
      //for each tweet object, we want to create the tweet element (structured like in the html)
      const $tweet = createTweetElement(tweet);
      //and add it to the main tweets container
      $("#tweets-container").prepend($tweet);
    }
  };

  renderTweets(data);

  //listen for a submit event
  $("#tweet-submit").on("submit", function(event) {
    //prevent submit to go to another page, as it normally does
    event.preventDefault();
    console.log("The Tweet was submitted!");
    //converts the form data into a query string as the server is configured to take query strings
    const serialized = $(this).serialize();
    console.log(serialized);

    //AJAX post request to where the tweets are stored
    $.post("/tweets", serialized, (response) => {
      console.log(response);
    });
  });

  //function to load the tweets onto the web browser
  const loadTweets = () => {
    //AJAX get request to the server tweet "database", handling a json response
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