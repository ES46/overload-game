$( document ).ready(function() {
    getGif()
    move()
    var oneMinute = 60 * 1,
        display = $('#time');
    startTimer(oneMinute, display);
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

// jQuery(function ($) {
//
// });

function move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 1000);
  function frame() {
      if (width >= 100) {
          clearInterval(id);
      } else {
          width++;
          elem.style.width = width + '%';
      }
  }
}

 var commands = ['fulfill sprint backlog', 'fix build-breaker', 'reference burndown chart', 'report fail-fast', 'begin sprint', 'complete task', 'consult task board', 'reduce technical debt', 'begin test automation', 'get user story', 'increase velocity', 'git push ORIGIN MASTER', 'git pull ORIGIN MASTER', 'water the garden', 'ready test', 'prioritize backlog', 'breakdown epic', 'create kanban', 'start iteration', 'communicate customer intent', 'call stand-up', 'agree on poker plan', 'consult stakeholder', 'submit pull request', 'start test-driven development', 'update wiki', 'buy ping-pong balls', 'fill keg', 'deploy app','take a nap on the couch']

 function randomCommand () {
   for (var i = 0; i < commands.length; i++) {
     console.log(commands[i]);
   }
    var randomSet = Math.random() * commands.length
    var random = Math.floor(randomSet)
    console.log(random);
 }
