var socket = io()

var oneMinute = 60 * 1,
    duration = oneMinute,
    timer = duration, minutes, seconds,
    display = $('#time'),
    elem = document.getElementById("myBar"),
    width = 0;

$(function() {
    document.querySelector('.container').addEventListener('click', function(event) {
      if(event.target.classList.contains('col-xs-6')){
          socket.emit('button', event.target.id)
      }
    })

    socket.on('button', function(msg) {
        console.log(msg)
    })

    setInterval(mainLoop, 1000)
    getGif()
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

function moveTimer() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(minutes + ":" + seconds);

    if (--timer < 0) {
        timer = duration;
    }
}

function moveBar() {
    if (width >= 100) {
        // clearInterval(id);
    } else {
        width += 5/3;
        elem.style.width = width + '%';
    }
}

function mainLoop(){
    moveTimer()
    moveBar()
}
