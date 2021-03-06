const express = require('express');
const linkQuery = require('./db/linkquery');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const pg = require('./db/knex');
const port = process.env.PORT || 3022;
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const key = process.env.COOKIE_KEY || 'gfddsahkjgrhjker';

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded(
    {
        extended: false
    }
));

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cookieSession(
    {
    	name: 'session',
    	keys: [key],
    	maxAge: 24*60*60*1000
    }
));

app.get('/', (req, res) => {
    res.render('splash') ;
});

app.get('/login', (req, res) => {
	if(req.query.incorrect){
		res.render('index', {login: 'Incorrect password. Please try again.'});
    }else if(req.query.invalid){
		res.render('index', {login: `We couldn't find your account. Please sign up!`});
    }else if(req.query.same){
		res.render('index', {login: 'Your account already exists. Please log in!'});
    }else{
		res.render('index');
	}
});

app.get('/game', (req, res) => {
	res.render('game');
});

app.get('/gameover', (req, res) => {
	linkQuery.getUser(+req.session.id)
	.then(data => {
		data[0].newScore = +req.query.score;
		if(data[0].newScore > data[0].score){
			linkQuery.updateScore(+req.query.score, +req.session.id)
			.then(() => {
				data[0].newHighScore = true;
				res.render('gameover', {data: data[0]});
			})
		}else{
			res.render('gameover', {data: data[0]});
    	}
	});
});

app.post('/user', (req, res) => {
    linkQuery.addUser(req.body)
    .then(() => {
    	res.redirect('/game');
    });
});

app.get('/user/:id', (req, res) => {
    linkQuery.getUser(req.params.id)
    .then(data => {
    	res.render('user',
            {
            	data
            }
        );
    });
});

app.post('/signup', (req, res, next) => {
	linkQuery.findUserIfExists({playername: req.body.playername})
	.then(user => {
    	if(user){
    		res.redirect('/login?same=true');
    	}else{
    		bcrypt.hash(req.body.password, 10)
			.then(hash => {
     			req.body.password = hash;
				linkQuery.userTable(req.body)
        		.then(() => {
            		linkQuery.findUserIfExists({playername: req.body.playername})
            		.then(data => {
            			req.session.id = data.id;
            			res.redirect('/game');
          			});
				});
        	});
		}
	})
	.catch(obj => {
    	console.log('error on posting new user to db', obj);
  	});
});

app.post('/login', (req, res, next) => {
	linkQuery.findUserIfExists({playername: req.body.playername})
	.then(user => {
		if(user){
			bcrypt.compare(req.body.password, user.password)
			.then(data => {
				if(data){
					req.session.id = user.id;
					res.redirect('/game');
				}else{
					res.redirect('/login?incorrect=true');
				}
			});
        }else{
			res.redirect('/login?invalid=true');
		}
	});
});

// Start with 0 for the score
let score = 0;

// Initialize empty current commands array
let commands = [];

// Initialize array of player socked ids
let players = [];

function sendCommands(){
    for (let i = 0; i < 3; i++) {
        io.to(players[i]).emit('command', commands[i]);
    }
}

function generateCommands(){
    let randomSet, random;

    for (let i = 0; i < 3; i++) {
        // Select a random command from each player set
        randomSet = (Math.random() * 12) + (i * 12);
        random = Math.floor(randomSet);

        // Add the command to the commands array
        commands.push(random);
    }

    // Randomize the order of the commands
    commands.sort((a, b) => {
        return 0.5 - Math.random()
    });
}

function checkCommands(id){
    // If the pressed button is in the commands array
    if(commands.includes(id)){
        // Removed the correctly pressed command from the remaining commands
        commands = commands.filter(entry => {
            return entry !== id;
        });
    }

    // Return whether or not it was the last command to complete
    return commands.length;
}

let duration = 60,
    timer = duration,
    minutes,
    seconds,
    loop;

function moveTimer(){
    --timer;

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    io.emit('timer', [minutes, seconds]);
}

function checkTimer(){
    // If the timer runs out...
    if(timer === 0){
		// Send the final score to all players
        io.emit('score', score);

		// Reset game letiables
        players = [];
        commands = [];
        score = 0;

        // Send the end message to all players
        io.emit('end', true);

        // Reset the timer to one minute
        timer = duration;

        // Stop the main loop
        clearInterval(loop);
    }
}

function mainLoop(){
    moveTimer();
    checkTimer();
}

// Perform this callback when a player connects to the '/game' route
io.on('connection', socket => {
    // Add this players socket ID to the array of players
    players.push(socket.id);

    // Start the game if the this is the 3rd player to join
    if (players.length === 3) {
		// Send player id's to each player in the player array
		for(let i = 0; i < players.length; i++){
			io.to(players[i]).emit('id', players.indexOf(players[i]) + 1);
		}

        // Send the start message to all players
        io.emit('start', true);

        // Generate and fill the commands array with commands
        generateCommands();

        // Send an individual command to each player
        sendCommands();

        // Start the main timer loop
        loop = setInterval(mainLoop, 1000);
    }

    // When receiving a button message, push that button id to all players
    socket.on('button', msg => {
        // If the last command is fulfilled...
        if(!checkCommands(msg)){
            // Add to the score total
            score += 3;

            // Send the updated score the the players
            io.emit('score', score);

            // Generate new commands
            generateCommands();

            // Send the new command to the player
            sendCommands();
        }
    });

	socket.on('disconnect', () => {
		// On disconnect, remove that player from the players array
		let i = players.indexOf(socket.id);
		players.splice(i, 1);
	});
});

http.listen(port, () => {
    console.log(`listening on ${port}`);
});
