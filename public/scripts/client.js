/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  //function for creating a tweet from the user info object; these new tweets will have classes that will allow them to be stylized as per our css stylesheets
  const createTweetElement = (tweet) => {
    //start with creating an article tag
    const $tweet = $("<article class='unique-tweet'></article>");
    //followed by the first child of the article tag
    const $tweetHeader = $("<header class='tweet-head'></header>");
    //name and handle are children of the header tag
    const $tweetName = $(`<p>${tweet.user.avatars}${tweet.user.name}</p>`);
    const $tweetHandle = $(`<p class="handle">${tweet.user.handle}</p>`);
    //next is the middle of the article(child of article)
    const $tweetBody = $(`<p class="tweet-middle">${tweet.content.text}</p>`);
    //followed by a footer tag(child of article)
    const $tweetFooter = $("<footer class='tweet-foot'></footer>");
    //date and images are children of the footer tag
    const $tweetDate = $(`<p>${timeago.format(tweet.created_at)}</p>`);
    const $tweetImages = $("<div class='images'></div>");
    //the following i tags pertain to images that are children of the footer tag
    const $tweetImageOne = $('<i class="fas fa-flag"></i>');
    const $tweetImageTwo = $('<i class="fas fa-retweet"></i>');
    const $tweetImageThree = $('<i class="fas fa-heart"></i>');
    
    //we want to then combine them to make the desired tree structure
    $tweetImages.append($tweetImageOne, $tweetImageTwo, $tweetImageThree);
    $tweetHeader.append($tweetName, $tweetHandle);
    $tweetFooter.append($tweetDate, $tweetImages);
    //this combines all of substructures to the article tag, which is the container for each individual tweet
    $tweet.append($tweetHeader, $tweetBody, $tweetFooter);

    //we want to return this combined tweet
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $("#tweets-container").append($tweet);


});