var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
var password = 'Wsordfish';
var users = [];
var id = 0;

console.log('websockets server started');

ws.on('connection', function(socket){
  console.log('client connection established');
  var user = {};
  user.id = ++id;
  user.auth = false;
  users.push(user);
  socket.userId = id;
  socket.send('enter your password: ');

  socket.on('message', function(data){
    console.log('message received: ' + data);

    if(data === password){
      users[socket.userId-1].auth = true;
      messages.forEach(function(msg){
        socket.send(msg);
      });
    } else{
      if(!users[socket.userId-1].auth){
        socket.send('wrong password');
      }
    }

    ws.clients.forEach(function(clientSocket){
      if(socket.userId === users[socket.userId-1].id && users[socket.userId-1].auth){
        clientSocket.send(data);
        messages.push(data);
      }
    });
  });
});
