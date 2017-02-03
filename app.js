const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');

let cacheTenMessages = [];

app.use(express.static('dist'));

io.on('connection', function(client) {
  console.log('A client has connected...');

  client.on('join', () => {
    cacheTenMessages.forEach((message) => {
      client.emit('message', message);
    });
  });

  client.on('message', (response) => {
    cacheMessage( response );
    client.emit('message', response);
    client.broadcast.emit('message', response);
  });

});

server.listen(8080, () => {
  console.log('Server is listening on %d', 8080);
});

function cacheMessage(message) {

  if ( cacheTenMessages.length > 9 ) {
    cacheTenMessages.shift();
  }

  cacheTenMessages.push(message);
};
