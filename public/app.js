$( document ).ready(function() {
    console.log( "ES46 BI-OTCH!" );
    getGif()
});

function getGif() {
  var url = 'http://api.giphy.com/v1/gifs/search?q=the+office&limit=10&api_key=dc6zaTOxFJmzC&offset=0'
  $.get(url)
    .then(function(data) {
      console.log(data);
      var gif = data.data[2].id
      // var randomize = Math.floor(Math.random()*data.data.length)
      // var gif = data.data[randomize].slug
      var gifUrl = "https://media.giphy.com/media/"+gif+"/giphy.gif"
      var img = $("<img>")
      img.attr("src", gifUrl)
      $('#gif').append(img)
      console.log(gif);
    })
  }
