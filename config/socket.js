module.exports = function (server) {
  var io = require('socket.io').listen(server);

  var games = {};
  var users = 0;

  var liveDash = io.of('/livedash');
  liveDash.on('connection', function(socket){
    socket.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
  });

  function Player (socket, username, status, side, position, turn) {
    this.socket = socket;
    this.name = username;
    this.status = status;
    this.side = side;
    this.position = position;
    this.turn = turn;
  }

  Player.prototype.updatePosition = function (diceOutcome) {
    this.position += diceOutcome;
  };

  Player.prototype.updateTurn = function () {
    this.turn += 1;
  };

  io.sockets.on('connection', function (socket) {
    var username = socket.handshake.query.user;

    users++;
    liveDash.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});

    socket.on('join', function (data) {
      var room = data.token;
      if (!(room in games)) {
        var player1 = new Player(socket, username, 'joined', data.side, 0, 1);
        var player2 = new Player(null, '', 'open', data.side === 'black'?'white':'black', 0, 2);
        var players = [player1, player2];
        games[room] = {
          room: room,
          creator: socket,
          status: 'waiting',
          creationDate: Date.now(),
          players: players
        };

        socket.join(room);
        socket.emit('wait');
        return;
      }

      game = games[room];

      socket.join(room);
      games[room].players[1].socket = socket;
      games[room].players[1].name = username;
      games[room].players[1].status = "joined";
      games[room].status = "ready";
      
      // TURN LOGIC DAPARA KHA MAUZOON ZAI DY!
      io.sockets.to(room).emit('ready', { white: getPlayerName(room, 'white'), black: getPlayerName(room, 'black') });
      games[room].creator.emit('start-game');
    });


    socket.on('new-move', function(data) {
      console.log(Object.keys(games).length);
      var diceOutcome = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      var side = data.side;
      var room = data.token;
      games[room].players[0].updateTurn();
      games[room].players[1].updateTurn();
      for (var i in games[room].players) {
        var plr = games[room].players[i];
        if (plr.side === side) {
          plr.updatePosition(diceOutcome);
        }
      }
      console.log('#Move! from ' + data.side + ' with DICE OUTCOME = ' + diceOutcome);
      console.log('P1 turn: ' + games[room].players[0].turn + ' :: P2 turn ' + games[room].players[1].turn);
      
      var staticPack = [];
      for (var i in games[room].players) {
        staticPack.push(games[room].players[i].side);
        staticPack.push(games[room].players[i].position);
      }
      
      io.sockets.to(data.token).emit('new-move', {diceOutcome: diceOutcome, side: side, staticPack: staticPack});
      console.log('P1 turn: ' + games[room].players[0].turn + ' :: P2 turn ' + games[room].players[1].turn);
      if (games[room].players[0].turn % 2 === 0) {
        games[room].players[0].socket.to(data.token).emit('can-throw');
      }
      if (games[room].players[1].turn % 2 === 0) {
        games[room].players[1].socket.to(data.token).emit('can-throw');
      }
    });

    socket.on('game-over', function (data) {
      var side = data.side;
      var room = data.room;
      if (room in games) {
        io.sockets.to(room).emit('game-over', {side: side});
        games[room].players[0].socket.leave(room);
        games[room].players[1].socket.leave(room);
        delete games[room];
      }
      // console.log(Object.keys(games).length);
    });

    socket.on('disconnect', function(data){
      users--;
      for (var token in games) {
        var game = games[token];
        for (var p in game.players) {
          var player = game.players[p];
          if (player.socket === socket) {
            socket.broadcast.to(token).emit('opponent-disconnected');
            delete games[token];
             liveDash.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
          }
        }
      }
    });

  });

  function getPlayerName(room, side) {
    var game = games[room];
    for (var p in game.players) {
      var player = game.players[p];
      if (player.side === side) {
        // console.log(player.name);
        return player.name;
      }
    }
  }

};