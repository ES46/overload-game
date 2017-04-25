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

    getGif()
    setInterval(mainLoop, 1000)
    randomCommand()

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

 var commands = ['fulfill sprint backlog', 'fix build-breaker', 'reference burndown chart', 'report fail-fast', 'begin sprint', 'complete task', 'consult task board', 'reduce technical debt', 'begin test automation', 'get user story', 'increase velocity', 'git push ORIGIN MASTER', 'git pull ORIGIN MASTER', 'water the garden', 'ready test', 'prioritize backlog', 'breakdown epic', 'create kanban', 'start iteration', 'communicate customer intent', 'call stand-up', 'agree on poker plan', 'consult stakeholder', 'submit pull request', 'start test-driven development', 'update wiki', 'buy ping-pong balls', 'fill keg', 'deploy app','take a nap on the couch']

 function randomCommand () {
   for (var i = 0; i < commands.length; i++) {
     console.log(commands[i]);
   }
    var randomSet, random
    // console.log(random);

    for (var i = 0; i < 4; i++) {
       randomSet = Math.random() * commands.length
       random = Math.floor(randomSet)
      console.log(random);
    }
 }
