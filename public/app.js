function getGif(){
    let url = 'https://api.giphy.com/v1/gifs/search?q=8bit+bomb&limit=50&api_key=dc6zaTOxFJmzC&offset=0'
    $.get(url)
    .then(data => {
    	let gif = data.data[4].id
        let gifUrl = 'https://media.giphy.com/media/' + gif + '/giphy.gif'
        let img = $('<img>')
        img.attr('src', gifUrl)
        $('#gif').append(img)
	})
}

function moveBar(){
    if(width > 0){
        width -= 5 / 3
        bar.style.width = width + '%'
    }
}

let commands = [
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
    if(id === 1){
        for(let i = 0; i < 6; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }

        for(let i = 6; i < 12; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i]
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }else if(id === 2){
        for (let i = 12; i < 18; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }

        for (let i = 18; i < 24; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }else if(id === 3){
        for (let i = 24; i < 30; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }

        for (let i = 30; i < 36; i++){
            let tempButton = document.createElement('button')
            let tempText = document.createTextNode(commands[i])
            tempButton.className = 'b12 col-xs-6 col-sm-4 col-md-2 col-lg-2'
            tempButton.type = 'button'
            tempButton.id = i
            tempButton.appendChild(tempText)
            $('.leftbuttons').append(tempButton)
        }
    }
}

function addCommand(id){
    let tempCommand = document.createElement('li')
    let tempText = document.createTextNode(commands[id])
    tempCommand.id = id
    tempCommand.appendChild(tempText)
    $('.shell-body').append(tempCommand)
}

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile()
	let googlePlayer = profile.getEmail()
}

function bombClick() {
	$('.bomb').click(event => {
		let current = event.target
		$('.bomb').remove()
		$('.splash-text').remove()
 		getGif()
		setTimeout(() => {
			$.ajax({
				url: '/login',
				success: function(data) {
					document.location.href='/login'
        		}
      		})
		}, 1100)
	})
}
