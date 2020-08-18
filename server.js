const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

let uid;
let msgid;
let serverIp = 'foo';
let allClients = [];
// let socketid;

// Solve CORS issues
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Chat connects
io.on('connection', (socket) => {
	

	console.log("THIS SOCKET CONNECT ",socket.id);

	socket.on('connectUser', (user) => {

		if(user !== null){

			allClients.push(socket);
			timestamp = new Date().getTime();

			// console.log("SOCKET ID ",socket.id);
			// console.log("UID ",user);
			// console.log("timestamp ",timestamp);
			// console.log('SERVER user connected --> ',uID: uid, flagIDs: [], joinTime: timestamp, socketID: socket.id);

			io.emit('newUser', { uID: user, flagIDs: [], joinTime: timestamp, socketID: socket.id });
		}
		
	});

	socket.on('disconnect', () => {
		console.log('user: disconnected',socket.id);
		io.emit('disconnectedUser', socket.id);
	});

	socket.on('newMessage', (message) => {
		msgid = new Date().getTime();
		msgtext = message['text'];
		msguid = message['uID'];
		console.log("SERVER MSG ",message);

		io.emit('message', { type: 'message', text: msgtext, uID: msguid, socketID: socket.id, msgID: msgid, flagClasses: null});
	});

	socket.on('kickUser', (user) => {
		// DISCONNECT USER
		console.log("SERVER KICK ",user);
		console.log("allClients ",allClients);
		io.emit('kickedUser', user);
		if (io.sockets.connected[user['socketID']]) {
		    io.sockets.connected[user['socketID']].disconnect();
		}
	});

});

// /**
//  * Get port from environment and store in Express.
//  */
const port = process.env.PORT || '5000';
app.set('port', port);

// /**
//  * Listen on provided port, on all network interfaces.
//  */
server.listen(port, () => console.log(`API running on http://192.168.1.1:${port}`));