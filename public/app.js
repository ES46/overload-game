$( document ).ready(function() {
    getGif()
    move()
});

function getGif() {
  var url = 'https://api.giphy.com/v1/gifs/search?q=8bit+bomb&limit=10&api_key=dc6zaTOxFJmzC&offset=0'
  $.get(url)
    .then(function(data) {
      // console.log(data);
      var gif = data.data[2].id
      // var randomize = Math.floor(Math.random()*data.data.length)
      // var gif = data.data[randomize].slug
      var gifUrl = "https://media.giphy.com/media/"+gif+"/giphy.gif"
      var img = $("<img>")
      img.attr("src", gifUrl)
      $('#gif').append(img)
      // console.log(gif);
    })
  }

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var oneMinute = 60 * 1,
        display = $('#time');
    startTimer(fiveMinutes, display);
});

function move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 700);
  function frame() {
      if (width >= 100) {
          clearInterval(id);
      } else {
          width++;
          elem.style.width = width + '%';
      }
  }
}
