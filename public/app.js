function getGif() {
    var url = 'https://api.giphy.com/v1/gifs/search?q=8bit+bomb&limit=50&api_key=dc6zaTOxFJmzC&offset=0'
    $.get(url)
        .then(function(data) {
            // console.log(data);
            var gif = data.data[4].id
            // var randomize = Math.floor(Math.random()*data.data.length)
            // var gif = data.data[randomize].slug
            var gifUrl = 'https://media.giphy.com/media/' + gif + '/giphy.gif'
            var img = $('<img>')
            img.attr('src', gifUrl)
            $('#gif').append(img)
            // console.log(gif);
        })
}

function moveTimer() {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    display.text(minutes + ':' + seconds)

    if (--timer < 0) {
        timer = duration
    }
}

function moveBar() {
    if (width >= 100) {
        // clearInterval(id);
    } else {
        width += 5 / 3
        elem.style.width = width + '%'
    }
}

function mainLoop() {
    moveTimer()
    moveBar()
}

var commands = [
    'fulfill sprint backlog',
    'fix build-breaker',
    'reference burndown chart',
    'report fail-fast',
    'begin sprint',
    'pair program',
    'complete task',
    'debug feature',
    'consult task board',
    'reduce technical debt',
    'begin test automation',
    'manage scrumban',
    'get user story',
    'increase velocity',
    'git push ORIGIN MASTER',
    'take a nap on the couch',
    'water the garden',
    'update wiki',
    'ready test',
    'research spike',
    'prioritize backlog',
    'breakdown epic',
    'declare done done',
    'start iteration',
    'communicate customer intent',
    'call stand-up',
    'agree on poker plan',
    'review sprint',
    'consult stakeholder',
    'make stickers',
    'submit pull request',
    'start test-driven development',
    'fill keg',
    'deploy app',
    'buy ping-pong balls',
    'git pull ORIGIN MASTER'
]

function addButtons(id){
    var pos = id - 1

    if(id === 1){
        for (var i = 0; i < 6; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
        for (var i = 6; i < 12; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }else if(id === 2){
        for (var i = 12; i < 18; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
        for (var i = 18; i < 24; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }else if(id === 3){
        for (var i = 24; i < 30; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
        for (var i = 30; i < 36; i++) {
            var tempButton = document.createElement('button')
            var tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }
}

function addCommand(id){
    var tempButton = document.createElement('li')
    var tempText = document.createTextNode(commands[id])
    tempButton.id = id
    tempButton.appendChild(tempText)
    $('.shell-body').append(tempButton)
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()
    // console.log(googleUser);
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    var googlePlayer = profile.getEmail()
    console.log(googlePlayer)
}

$('.g-signin2').click((googleUser) => {
  var current = event.target
  console.log(googlePlayer);
  $.post({
    url : '/user',
    method : 'POST'
  })
})

function bombClick() {
  $('.bomb').click((event) => {
    var current = event.target
    $('.bomb').remove()
      getGif()
      setTimeout(function(){
      $.ajax({
       url: '/login',
       success: function(data) {
          //this is the redirect
          document.location.href='/login';
        }
      }
    )
  }, 1100)
  })
}
