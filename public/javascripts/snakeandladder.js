$(document).ready(function () {

  var username;
  $('#gameCanvas').hide();

  if ($('#user').length) {
    username = $('#user').data('user');
  } else {
    username = 'guest' + Math.floor(Math.random() * (300 - 1 + 1) + 1);
  }

  var socket = io('http://localhost:3000', {query: 'user=' + username});
  var liveDash = io('http://localhost:3000/livedash');

  if ($("#board").length) {
    var token = $("#board").data('token');
    var side = $("#board").data('side');
    var opponentSide = side === "black" ? "white" : "black";
    var gameStatus;
    var canThrow = false;

    socket.emit('join', {
      'token': token,
      'side': side
    });

    socket.on('wait', function () {
      // var url = "http:/localhost:3000/game/" + token + "/" + opponentSide;
      var url = "/" + token + "/" + opponentSide;
      $('#gameUrl').val(url);
      $('#gameUrlPopup').show();
      $('#copy').on('click', function () {copyToClipboard();});
    });

    function copyToClipboard() {
      document.querySelector('input').select();
      document.execCommand('copy');
      if (document.selection) {
        document.selection.empty();
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    }

    function Player (username, x, y, side, position, turns, ups, downs) {
      this.username = username;
      this.x = x;
      this.y = y;
      this.side = side;
      this.newPos = position;
      this.turns = turns;
      this.ups = ups;
      this.downs = downs;
      this.overflow = false;
    }

    Player.prototype.updateStatic = function (diceOutcome) {
      if ((this.newPos + diceOutcome) <= 100) {
        this.overflow = false;
        this.newPos += diceOutcome;
      } else {
        this.overflow = true;
      }
      this.turns += 1;
      switch (this.newPos) {
        case 1:
          this.x = 7; this.y = 547;
          break;
        case 2:
          this.x = 67; this.y = 547;
          break;
        case 3:
          this.x = 127; this.y = 547;
          break;
        case 4:
          this.x = 187; this.y = 547;
          break;
        case 5:
          this.x = 247; this.y = 547;
          break;
        case 6:
          this.x = 307; this.y = 547;
          break;
        case 7:
          this.x = 367; this.y = 547;
          break;
        case 8:
          this.x = 427; this.y = 547;
          break;
        case 9:
          this.x = 487; this.y = 547;
          break;
        case 10:
          this.x = 547; this.y = 547;
          break;
        case 11:
          this.x = 547; this.y = 487;
          break;
        case 12:
          this.x = 487; this.y = 487;
          break;
        case 13:
          this.x = 427; this.y = 487;
          break;
        case 14:
          this.x = 367; this.y = 487;
          break;
        case 15:
          this.x = 307; this.y = 487;
          break;
        case 16:
          this.x = 247; this.y = 487;
          break;
        case 17:
          this.x = 187; this.y = 487;
          break;
        case 18:
          this.x = 127; this.y = 487;
          break;
        case 19:
          this.x = 67; this.y = 487;
          break;
        case 20:
          this.x = 7; this.y = 487;
          break;
        case 21:
          this.x = 7; this.y = 427;
          break;
        case 22:
          this.x = 67; this.y = 427;
          break;
        case 23:
          this.x = 127; this.y = 427;
          break;
        case 24:
          this.x = 187; this.y = 427;
          break;
        case 25:
          this.x = 247; this.y = 427;
          break;
        case 26:
          this.x = 307; this.y = 427;
          break;
        case 27:
          this.x = 367; this.y = 427;
          break;
        case 28:
          this.x = 427; this.y = 427;
          break;
        case 29:
          this.x = 487; this.y = 427;
          break;
        case 30:
          this.x = 547; this.y = 427;
          break;
        case 31:
          this.x = 547; this.y = 367;
          break;
        case 32:
          this.x = 487; this.y = 367;
          break;
        case 33:
          this.x = 427; this.y = 367;
          break;
        case 34:
          this.x = 367; this.y = 367;
          break;
        case 35:
          this.x = 307; this.y = 367;
          break;
        case 36:
          this.x = 247; this.y = 367;
          break;
        case 37:
          this.x = 187; this.y = 367;
          break;
        case 38:
          this.x = 127; this.y = 367;
          break;
        case 39:
          this.x = 67; this.y = 367;
          break;
        case 40:
          this.x = 7; this.y = 367;
          break;
        case 41:
          this.x = 7; this.y = 307;
          break;
        case 42:
          this.x = 67; this.y = 307;
          break;
        case 43:
          this.x = 127; this.y = 307;
          break;
        case 44:
          this.x = 187; this.y = 307;
          break;
        case 45:
          this.x = 247; this.y = 307;
          break;
        case 46:
          this.x = 307; this.y = 307;
          break;
        case 47:
          this.x = 367; this.y = 307;
          break;
        case 48:
          this.x = 427; this.y = 307;
          break;
        case 49:
          this.x = 487; this.y = 307;
          break;
        case 50:
          this.x = 547; this.y = 307;
          break;
        case 51:
          this.x = 547; this.y = 247;
          break;
        case 52:
          this.x = 487; this.y = 247;
          break;
        case 53:
          this.x = 427; this.y = 247;
          break;
        case 54:
          this.x = 367; this.y = 247;
          break;
        case 55:
          this.x = 307; this.y = 247;
          break;
        case 56:
          this.x = 247; this.y = 247;
          break;
        case 57:
          this.x = 187; this.y = 247;
          break;
        case 58:
          this.x = 127; this.y = 247;
          break;
        case 59:
          this.x = 67; this.y = 247;
          break;
        case 60:
          this.x = 7; this.y = 247;
          break;
        case 61:
          this.x = 7; this.y = 187;
          break;
        case 62:
          this.x = 67; this.y = 187;
          break;
        case 63:
          this.x = 127; this.y = 187;
          break;
        case 64:
          this.x = 187; this.y = 187;
          break;
        case 65:
          this.x = 247; this.y = 187;
          break;
        case 66:
          this.x = 307; this.y = 187;
          break;
        case 67:
          this.x = 367; this.y = 187;
          break;
        case 68:
          this.x = 427; this.y = 187;
          break;
        case 69:
          this.x = 487; this.y = 187;
          break;
        case 70:
          this.x = 547; this.y = 187;
          break;
        case 71:
          this.x = 547; this.y = 127;
          break;
        case 72:
          this.x = 487; this.y = 127;
          break;
        case 73:
          this.x = 427; this.y = 127;
          break;
        case 74:
          this.x = 367; this.y = 127;
          break;
        case 75:
          this.x = 307; this.y = 127;
          break;
        case 76:
          this.x = 247; this.y = 127;
          break;
        case 77:
          this.x = 187; this.y = 127;
          break;
        case 78:
          this.x = 127; this.y = 127;
          break;
        case 79:
          this.x = 67; this.y = 127;
          break;
        case 80:
          this.x = 7; this.y = 127;
          break;
        case 81:
          this.x = 7; this.y = 67;
          break;
        case 82:
          this.x = 67; this.y = 67;
          break;
        case 83:
          this.x = 127; this.y = 67;
          break;
        case 84:
          this.x = 187; this.y = 67;
          break;
        case 85:
          this.x = 247; this.y = 67;
          break;
        case 86:
          this.x = 307; this.y = 67;
          break;
        case 87:
          this.x = 367; this.y = 67;
          break;
        case 88:
          this.x = 427; this.y = 67;
          break;
        case 89:
          this.x = 487; this.y = 67;
          break;
        case 90:
          this.x = 547; this.y = 67;
          break;
        case 91:
          this.x = 547; this.y = 7;
          break;
        case 92:
          this.x = 487; this.y = 7;
          break;
        case 93:
          this.x = 427; this.y = 7;
          break;
        case 94:
          this.x = 367; this.y = 7;
          break;
        case 95:
          this.x = 307; this.y = 7;
          break;
        case 96:
          this.x = 247; this.y = 7;
          break;
        case 97:
          this.x = 187; this.y = 7;
          break;
        case 98:
          this.x = 127; this.y = 7;
          break;
        case 99:
          this.x = 67; this.y = 7;
          break;
        case 100:
          this.x = 7; this.y = 7;
          break;
        default:
          break;
      }
    };

    Player.prototype.updateStaticUpDown = function () {
      switch (this.newPos) {
        case 1:
          this.x = 7; this.y = 547;
          break;
        case 2:
          this.x = 67; this.y = 547;
          break;
        case 3:
          this.x = 127; this.y = 547;
          break;
        case 4:
          this.x = 187; this.y = 547;
          break;
        case 5:
          this.x = 247; this.y = 547;
          break;
        case 6:
          this.x = 307; this.y = 547;
          break;
        case 7:
          this.x = 367; this.y = 547;
          break;
        case 8:
          this.x = 427; this.y = 547;
          break;
        case 9:
          this.x = 487; this.y = 547;
          break;
        case 10:
          this.x = 547; this.y = 547;
          break;
        case 11:
          this.x = 547; this.y = 487;
          break;
        case 12:
          this.x = 487; this.y = 487;
          break;
        case 13:
          this.x = 427; this.y = 487;
          break;
        case 14:
          this.x = 367; this.y = 487;
          break;
        case 15:
          this.x = 307; this.y = 487;
          break;
        case 16:
          this.x = 247; this.y = 487;
          break;
        case 17:
          this.x = 187; this.y = 487;
          break;
        case 18:
          this.x = 127; this.y = 487;
          break;
        case 19:
          this.x = 67; this.y = 487;
          break;
        case 20:
          this.x = 7; this.y = 487;
          break;
        case 21:
          this.x = 7; this.y = 427;
          break;
        case 22:
          this.x = 67; this.y = 427;
          break;
        case 23:
          this.x = 127; this.y = 427;
          break;
        case 24:
          this.x = 187; this.y = 427;
          break;
        case 25:
          this.x = 247; this.y = 427;
          break;
        case 26:
          this.x = 307; this.y = 427;
          break;
        case 27:
          this.x = 367; this.y = 427;
          break;
        case 28:
          this.x = 427; this.y = 427;
          break;
        case 29:
          this.x = 487; this.y = 427;
          break;
        case 30:
          this.x = 547; this.y = 427;
          break;
        case 31:
          this.x = 547; this.y = 367;
          break;
        case 32:
          this.x = 487; this.y = 367;
          break;
        case 33:
          this.x = 427; this.y = 367;
          break;
        case 34:
          this.x = 367; this.y = 367;
          break;
        case 35:
          this.x = 307; this.y = 367;
          break;
        case 36:
          this.x = 247; this.y = 367;
          break;
        case 37:
          this.x = 187; this.y = 367;
          break;
        case 38:
          this.x = 127; this.y = 367;
          break;
        case 39:
          this.x = 67; this.y = 367;
          break;
        case 40:
          this.x = 7; this.y = 367;
          break;
        case 41:
          this.x = 7; this.y = 307;
          break;
        case 42:
          this.x = 67; this.y = 307;
          break;
        case 43:
          this.x = 127; this.y = 307;
          break;
        case 44:
          this.x = 187; this.y = 307;
          break;
        case 45:
          this.x = 247; this.y = 307;
          break;
        case 46:
          this.x = 307; this.y = 307;
          break;
        case 47:
          this.x = 367; this.y = 307;
          break;
        case 48:
          this.x = 427; this.y = 307;
          break;
        case 49:
          this.x = 487; this.y = 307;
          break;
        case 50:
          this.x = 547; this.y = 307;
          break;
        case 51:
          this.x = 547; this.y = 247;
          break;
        case 52:
          this.x = 487; this.y = 247;
          break;
        case 53:
          this.x = 427; this.y = 247;
          break;
        case 54:
          this.x = 367; this.y = 247;
          break;
        case 55:
          this.x = 307; this.y = 247;
          break;
        case 56:
          this.x = 247; this.y = 247;
          break;
        case 57:
          this.x = 187; this.y = 247;
          break;
        case 58:
          this.x = 127; this.y = 247;
          break;
        case 59:
          this.x = 67; this.y = 247;
          break;
        case 60:
          this.x = 7; this.y = 247;
          break;
        case 61:
          this.x = 7; this.y = 187;
          break;
        case 62:
          this.x = 67; this.y = 187;
          break;
        case 63:
          this.x = 127; this.y = 187;
          break;
        case 64:
          this.x = 187; this.y = 187;
          break;
        case 65:
          this.x = 247; this.y = 187;
          break;
        case 66:
          this.x = 307; this.y = 187;
          break;
        case 67:
          this.x = 367; this.y = 187;
          break;
        case 68:
          this.x = 427; this.y = 187;
          break;
        case 69:
          this.x = 487; this.y = 187;
          break;
        case 70:
          this.x = 547; this.y = 187;
          break;
        case 71:
          this.x = 547; this.y = 127;
          break;
        case 72:
          this.x = 487; this.y = 127;
          break;
        case 73:
          this.x = 427; this.y = 127;
          break;
        case 74:
          this.x = 367; this.y = 127;
          break;
        case 75:
          this.x = 307; this.y = 127;
          break;
        case 76:
          this.x = 247; this.y = 127;
          break;
        case 77:
          this.x = 187; this.y = 127;
          break;
        case 78:
          this.x = 127; this.y = 127;
          break;
        case 79:
          this.x = 67; this.y = 127;
          break;
        case 80:
          this.x = 7; this.y = 127;
          break;
        case 81:
          this.x = 7; this.y = 67;
          break;
        case 82:
          this.x = 67; this.y = 67;
          break;
        case 83:
          this.x = 127; this.y = 67;
          break;
        case 84:
          this.x = 187; this.y = 67;
          break;
        case 85:
          this.x = 247; this.y = 67;
          break;
        case 86:
          this.x = 307; this.y = 67;
          break;
        case 87:
          this.x = 367; this.y = 67;
          break;
        case 88:
          this.x = 427; this.y = 67;
          break;
        case 89:
          this.x = 487; this.y = 67;
          break;
        case 90:
          this.x = 547; this.y = 67;
          break;
        case 91:
          this.x = 547; this.y = 7;
          break;
        case 92:
          this.x = 487; this.y = 7;
          break;
        case 93:
          this.x = 427; this.y = 7;
          break;
        case 94:
          this.x = 367; this.y = 7;
          break;
        case 95:
          this.x = 307; this.y = 7;
          break;
        case 96:
          this.x = 247; this.y = 7;
          break;
        case 97:
          this.x = 187; this.y = 7;
          break;
        case 98:
          this.x = 127; this.y = 7;
          break;
        case 99:
          this.x = 67; this.y = 7;
          break;
        case 100:
          this.x = 7; this.y = 7;
          break;
        default:
          break;
      }
    };

    socket.on('ready', function (data) {
      $('#splashScreen').show();
      $('#loadingScreen').show();

      var volume = 1;
      var canUseLocalStorage = 'localStorage' in window && window.localStorage !== null;
      if (canUseLocalStorage) {
        var playSound = (localStorage['game.playSound'] == true);
      }
      assetLoader = (function() {
        this.imgs = {
          'canvasBg': '/gameassets/graphics/canvas-bg.png',
          'gameBoard': '/gameassets/graphics/game-board.png',
          'dice': '/gameassets/graphics/dice.png',
          'diceSprite': '/gameassets/graphics/dice-sprite.png',
          'playerWhite': '/gameassets/graphics/player-white.png',
          'playerBlack': '/gameassets/graphics/player-black.png',
          'diceWhite': '/gameassets/graphics/icon-dice-white.png',
          'ladderWhite': '/gameassets/graphics/icon-ladder-white.png',
          'snakeWhite': '/gameassets/graphics/icon-snake-white.png',
          'diceBlack': '/gameassets/graphics/icon-dice-black.png',
          'ladderBlack': '/gameassets/graphics/icon-ladder-black.png',
          'snakeBlack': '/gameassets/graphics/icon-snake-black.png',
          'turnIndicator': '/gameassets/graphics/turn-indicator.png',
        };

        this.sounds      = {
          'throwDice'          : '/gameassets/sounds/throwdice.wav',
          'upLadder'          : '/gameassets/sounds/up-on-ladder.wav',
          'downSnake'          : '/gameassets/sounds/down-on-snake.wav',
          'oneUp'          : '/gameassets/sounds/oneup.wav',
          'winner'          : '/gameassets/sounds/winner.wav',
          'loser'          : '/gameassets/sounds/loser.wav',
          'gameBgMusic'    : '/gameassets/sounds/game-background-music.wav'
        };

        var assetsLoaded = 0;                                // how many assets have been loaded
        var numImgs      = Object.keys(this.imgs).length;    // total number of image assets
        var numSounds    = Object.keys(this.sounds).length;
        this.totalAssest = numImgs + numSounds;              // total number of assets
        this.checkAudio  = {};

        function assetLoaded (self, dic, name) {
          assetsLoaded++;
          self[dic][name].status = 'loaded';
          assetProgress(assetsLoaded, self.totalAssest);
          if (assetsLoaded === self.totalAssest) {
            clearInterval(self.checkAudio);
            setTimeout(function () {
              $('#splashScreen').hide();
              $('#playScreen').hide();
              $('#loadingScreen').hide();
              $('#gameCanvas').show();
              initGame();
              assetLoader.sounds.gameBgMusic.volume = 0.1;
              assetLoader.sounds.gameBgMusic.loop = true;
              assetLoader.sounds.gameBgMusic.play();
            }, 1000);
          }
        }

        function checkAudioStatus() {
          for (var sound in this.sounds) {
            if (this.sounds.hasOwnProperty(sound) && this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4) {
              assetLoaded(this, 'sounds', sound);
            }
          }
        }

        var self = this;
        var src  = '';
        for (var img in this.imgs) {
          if (this.imgs.hasOwnProperty(img)) {
            src = this.imgs[img];
            this.imgs[img] = new Image();
            this.imgs[img].status = 'loading';
            this.imgs[img].onload = function() { assetLoaded(self, 'imgs', img); };
            this.imgs[img].src = src;
          }
        }
        for (var sound in this.sounds) {
          if (this.sounds.hasOwnProperty(sound)) {
            src = this.sounds[sound];
            this.sounds[sound] = new Audio();
            this.sounds[sound].status = 'loading';
            this.sounds[sound].volume = volume;
            this.sounds[sound].src = src;
          }
        }

        var that = this;
        if (numSounds > 0) {
          this.checkAudio = setInterval(function() { checkAudioStatus.call(that); },1000);
        }

        return {
          imgs: this.imgs,
          sounds: this.sounds,
          totalAssest: this.totalAssest
        };
      })();
      //intialize the timer
      // var time_sets=[0,0];
      //timer_interval=setInterval(function(){ time_sets=timer(time_sets)}, 1000);//repeat every second
      // $('#turn-w').addClass("fa fa-spinner");
      // $('#player-white').html(data.white);
      // $('#player-black').html(data.black);
      $('#gameUrlPopup').hide();
      p1 = new Player(data.white, 7, 547, 'white', 1, 0, 0, 0);
      p2 = new Player(data.black, 7, 547, 'black', 1, 0, 0, 0);
      players = [p1, p2];
    });

    function assetProgress(progress, total) {
      var progressInPercent = (progress / total) * 100;
      $('#progress').css({'width': progressInPercent + '%'});
    }

    socket.on('start-game', function () {
      canThrow = true;
    });

    socket.on('opponent-disconnected', function () {
      gameStatus = "Disconnected";
      $('#gameCanvas').css({"filter":"blur(6px)"});
      $('#noticon').attr('src', '/images/disc.png');
      $('#gameResult').html('Your opponent leaved.');
      $('#gameResultPopup').show();
    });

    var stage;
    var bmpTable;
    var bmpBoard;
    var bmpDice;
    var bmpP1;
    var bmpP2;
    var txtPositionWhite;
    var txtTurnsWhite;
    var txtUpsWhite;
    var txtDownsWhite;
    var txtPositionBlack;
    var txtTurnsBlack;
    var txtUpsBlack;
    var txtDownsBlack;
    var sideIndicator;
    var sideIndicatorMessage;
    var turnIndicator;
    var turnMessage;
    var perfectLandIndicator;
    var perfectLandMessage;

    function initGame() {
      stage = new createjs.Stage("gameCanvas");

      gameTable();
      gameBoard();
      staticBoard();
      dice();
      playersPiece();
      playerStatics();

      createjs.Tween.get(sideIndicator, { loop: false })
        .to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
        .to({ alpha: 1 }, 2000, createjs.Ease.getPowInOut(1))
        .to({ alpha: 0 }, 1000, createjs.Ease.getPowInOut(2));
      createjs.Tween.get(sideIndicatorMessage, { loop: false })
        .to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
        .to({ alpha: 1 }, 2000, createjs.Ease.getPowInOut(1))
        .to({ alpha: 0 }, 1000, createjs.Ease.getPowInOut(2));

      createjs.Ticker.addEventListener("tick", stage);
      stage.update();
    }

    function gameTable () {
      bmpTable = new createjs.Bitmap(assetLoader.imgs.canvasBg);
      bmpTable.setTransform(0,0,1,1);
      stage.addChild(bmpTable);
    }

    function gameBoard () {
      bmpBoard = new createjs.Bitmap(assetLoader.imgs.gameBoard);
      bmpBoard.x = 7;
      bmpBoard.y = 7;
      stage.addChild(bmpBoard);
    }

    function dice () {
      bmpDice = new createjs.Bitmap(assetLoader.imgs.dice);
      bmpDice.setTransform(626,7);
      bmpDice.addEventListener('click', throwDice);
      var diceCircle = new createjs.Shape();
      diceCircle.graphics.setStrokeStyle(4).beginStroke("#333").drawCircle(0, 0, 104);
      diceCircle.x = 729;
      diceCircle.y = 109.5;
      stage.addChild(diceCircle);
      stage.addChild(bmpDice);
    }

    function playersPiece () {
      bmpP1 = new createjs.Bitmap(assetLoader.imgs.playerWhite);
      bmpP1.x = players[0].x;
      bmpP1.y = players[0].y;
      bmpP2 = new createjs.Bitmap(assetLoader.imgs.playerBlack);
      bmpP2.x = players[1].x;
      bmpP2.y = players[1].y;

      sideIndicator = new createjs.Shape();
      sideIndicator.graphics.setStrokeStyle(2).beginStroke('rgba(0,0,0,0.8)').drawRoundRect(207,287,200,30,15);
      sideIndicator.graphics.beginFill('rgba(0,0,0,0.8)').drawRoundRect(207,287,200,30,15);
      sideIndicator.alpha = "0";
      sideIndicatorMessage = new createjs.Text("", "22px 'Dekko', cursive", "#fff");
      sideIndicatorMessage.setTransform(307,295,1,1);
      sideIndicatorMessage.textAlign = "center";
      sideIndicatorMessage.alpha = "0";

      if (side === 'white') {
        stage.addChild(bmpP2);
        stage.addChild(bmpP1);
        sideIndicatorMessage.text = "You're WHITE!";
      }
      if (side === 'black') {
        stage.addChild(bmpP1);
        stage.addChild(bmpP2);
        sideIndicatorMessage.text = "You're BLACK!";
      }

      stage.addChild(sideIndicator, sideIndicatorMessage);
    }

    function throwDice () {
      if (canThrow === true) {
        // var diceOutcome = Math.floor(Math.random() * (6 - 1 + 1) + 1);
        socket.emit('new-move', {token: token, side: side, turn: canThrow});
        canThrow = false;
      }
    }

    function staticBoard () {
      var container = new createjs.Shape();
      container.graphics.setStrokeStyle(2).beginStroke('rgba(0,0,0,0.5)').rect(621,220,215,385);
      container.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(621, 220, 215, 385);

      // This Graphic needs to be refined the existing graphics in not looking too Good!
      var staticWhite = new createjs.Shape();
      staticWhite.graphics.beginFill('rgba(255,255,255,0.3)').drawRect(626,225,205,185);
      var staticWhiteTitleBar = new createjs.Shape();
      staticWhiteTitleBar.graphics.beginFill('rgba(255,255,255,0.3)').drawRect(626,225,205,30);
      var titleWhite = new createjs.Text("W H I T E ' s", "20px 'Dekko', cursive", "#000");
      titleWhite.setTransform(631,232,1,1);


      var txtPositionWhiteTitleBar = new createjs.Shape();
      txtPositionWhiteTitleBar.graphics.setStrokeStyle(2).beginStroke('rgba(0,0,0,0.5)').rect(631,275,100,110);
      txtPositionWhiteTitleBar.graphics.beginFill('rgba(255,255,255,0.3)').drawRect(631,275,100,110);
      var txtPositionWhiteTitle = new createjs.Text("", "25px 'Julee', cursive", "#000");
      txtPositionWhiteTitle.setTransform(635,280,1,1);
      txtPositionWhiteTitle.text = "Current\n";
      txtPositionWhiteTitle.text += " Position";

      var diceWhite = new createjs.Bitmap(assetLoader.imgs.diceBlack);
      diceWhite.setTransform(745,265,1,1);
      var ladderWhite = new createjs.Bitmap(assetLoader.imgs.ladderBlack);
      ladderWhite.setTransform(748,315,1,1);
      var snakeWhite = new createjs.Bitmap(assetLoader.imgs.snakeBlack);
      snakeWhite.setTransform(745,365,1,1);

      var staticBlack = new createjs.Shape();
      staticBlack.graphics.beginFill('rgba(0,0,0,0.5)').drawRect(626,415,205,185);
      var staticBlackTitleBar = new createjs.Shape();
      staticBlackTitleBar.graphics.beginFill('rgba(0,0,0,0.5)').drawRect(626,415,205,30);
      var titleBlack = new createjs.Text("B L A C K ' s", "20px 'Dekko', cursive", "#fff");
      titleBlack.setTransform(631,422,1,1);

      if (side === 'white') {
        titleWhite.text = players[0].username;
        titleBlack.text = players[1].username;
      }
      if (side === 'black') {
        titleBlack.text = players[1].username;
        titleWhite.text = players[0].username;
      }

      var txtPositionBlackTitleBar = new createjs.Shape();
      txtPositionBlackTitleBar.graphics.setStrokeStyle(2).beginStroke('rgba(255,255,255,0.3)').rect(631,465,100,110);
      txtPositionBlackTitleBar.graphics.beginFill('rgba(0,0,0,0.5)').drawRect(631,465,100,110);
      var txtPositionBlackTitle = new createjs.Text("", "25px 'Julee', cursive", "#fff");
      txtPositionBlackTitle.setTransform(635,470,1,1);
      txtPositionBlackTitle.text = "Current\n";
      txtPositionBlackTitle.text += " Position";

      var diceBlack = new createjs.Bitmap(assetLoader.imgs.diceWhite);
      diceBlack.setTransform(745,455,1,1);
      var ladderBlack = new createjs.Bitmap(assetLoader.imgs.ladderWhite);
      ladderBlack.setTransform(748,505,1,1);
      var snakeBlack = new createjs.Bitmap(assetLoader.imgs.snakeWhite);
      snakeBlack.setTransform(745,555,1,1);


      turnIndicator = new createjs.Shape();
      turnIndicator.graphics.setStrokeStyle(2).beginStroke('rgba(0,0,0,0.8)').drawRoundRectComplex(217,0,180,25,0,0,15,15);
      turnIndicator.graphics.beginFill('rgba(0,0,0,0.8)').drawRoundRectComplex(217,0,180,25,0,0,15,15);
      turnMessage = new createjs.Text("", "20px 'Dekko', cursive", "#fff");
      turnMessage.setTransform(307,5,1,1);
      turnMessage.textAlign = "center";

      perfectLandIndicator = new createjs.Shape();
      perfectLandIndicator.graphics.setStrokeStyle(2).beginStroke('rgba(0,0,0,0.8)').drawRoundRect(207,287,200,30,15);
      perfectLandIndicator.graphics.beginFill('rgba(0,0,0,0.8)').drawRoundRect(207,287,200,30,15);
      perfectLandIndicator.alpha = "0";
      perfectLandMessage = new createjs.Text("", "22px 'Dekko', cursive", "#fff");
      perfectLandMessage.setTransform(307,295,1,1);
      perfectLandMessage.textAlign = "center";
      perfectLandMessage.alpha = "0";

      stage.addChild(container, staticWhite, staticBlack);
      stage.addChild(staticWhiteTitleBar, titleWhite, txtPositionWhiteTitleBar, txtPositionWhiteTitle);
      stage.addChild(diceWhite, ladderWhite, snakeWhite);
      stage.addChild(staticBlackTitleBar, titleBlack, txtPositionBlackTitleBar, txtPositionBlackTitle);
      stage.addChild(diceBlack, ladderBlack, snakeBlack);
    }

    function playerStatics () {
      txtPositionWhite = new createjs.Text("1", "60px 'Julee', cursive", "#000");
      txtPositionWhite.setTransform(635,330,1,1);

      txtTurnsWhite = new createjs.Text("0", "25px 'Julee', cursive", "#000");
      txtTurnsWhite.setTransform(785,272,1,1);
      txtUpsWhite = new createjs.Text("0", "25px 'Julee', cursive", "#000");
      txtUpsWhite.setTransform(785,322,1,1);
      txtDownsWhite = new createjs.Text("0", "25px 'Julee', cursive", "#000");
      txtDownsWhite.setTransform(785,372,1,1);

      txtPositionBlack = new createjs.Text("1", "60px 'Julee', cursive", "#FFF", "Italic");
      txtPositionBlack.setTransform(635,520,1,1);

      txtTurnsBlack = new createjs.Text("0", "25px 'Julee', cursive", "#FFF");
      txtTurnsBlack.setTransform(785,462,1,1);
      txtUpsBlack = new createjs.Text("0", "25px 'Julee', cursive", "#FFF");
      txtUpsBlack.setTransform(785,512,1,1);
      txtDownsBlack = new createjs.Text("0", "25px 'Julee', cursive", "#FFF");
      txtDownsBlack.setTransform(785,562,1,1);

      updatePlayerStatics();
    }

    function updatePlayerStatics () {
      txtPositionWhite.text = players[0].newPos.toString();
      txtTurnsWhite.text = players[0].turns.toString();
      txtUpsWhite.text = players[0].ups.toString();
      txtDownsWhite.text = players[0].downs.toString();
      txtPositionBlack.text = players[1].newPos.toString();
      txtTurnsBlack.text = players[1].turns.toString();
      txtUpsBlack.text = players[1].ups.toString();
      txtDownsBlack.text = players[1].downs.toString();

      stage.addChild(txtPositionWhite,txtTurnsWhite,txtUpsWhite,txtDownsWhite);
      stage.addChild(txtPositionBlack,txtTurnsBlack,txtUpsBlack,txtDownsBlack);
      stage.addChild(turnIndicator, turnMessage);
      stage.addChild(perfectLandIndicator, perfectLandMessage);

      if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
      }
    }

    function tick (event) {
      txtPositionWhite.text = (players[0].newPos).toString();
      txtTurnsWhite.text = (players[0].turns).toString();
      txtUpsWhite.text = (players[0].ups).toString();
      txtDownsWhite.text = (players[0].downs).toString();

      txtPositionBlack.text = (players[1].newPos).toString();
      txtTurnsBlack.text = (players[1].turns).toString();
      txtUpsBlack.text = (players[1].ups).toString();
      txtDownsBlack.text = (players[1].downs).toString();

      if (canThrow === true) {
        turnMessage.text = "YOUR TURN!";
      }
      if (canThrow === false) {
        setTimeout(function () { turnMessage.text = "OPT.'s  TURN!"; }, 1500);
      }
    }

    function rollDice (outcome) {
      var count = outcome + 22;
      var spriteSheet = new createjs.SpriteSheet({
        framerate: 20,
        "images": [assetLoader.imgs.diceSprite],
        "frames": {"regX": 0, "height": 205, "count": 29, "regY": 0, "width": 205},
        "animations": {
          "roll": [0, 23, "roll", 1.5],
        }
      });

      grant = new createjs.Sprite(spriteSheet, "roll");
      grant.x = 626;
      grant.y = 7;
      grant.play();
      assetLoader.sounds.throwDice.play();

      setTimeout(function () {
        grant.gotoAndStop(count);
      }, 800);

      stage.addChild(grant);
    }

    socket.on('new-move', function (data) {
      rollDice(data.diceOutcome);
      if (data.side === p1.side) {
        p1.updateStatic(data.diceOutcome);
        setTimeout(function () {
          createjs.Tween.get(bmpP1, { loop: false })
            .to({ x: players[0].x, y: players[0].y }, 1000, createjs.Ease.getPowInOut(4));

          switch (players[0].newPos) {
            case 5:
              players[0].ups += 1;
              players[0].newPos = 27;
              setTimeout(function () { upLadderDownSnake('p1', 'up')}, 1000);
              break;
            case 11:
              players[0].ups += 1;
              players[0].newPos = 33;
              setTimeout(function () { upLadderDownSnake('p1', 'up')}, 1000);
              break;
            case 48:
              players[0].ups += 1;
              players[0].newPos = 84;
              setTimeout(function () { upLadderDownSnake('p1', 'up')}, 1000);
              break;
            case 60:
              players[0].ups += 1;
              players[0].newPos = 78;
              setTimeout(function () { upLadderDownSnake('p1', 'up')}, 1000);
              break;
            case 73:
              players[0].ups += 1;
              players[0].newPos = 95;
              setTimeout(function () { upLadderDownSnake('p1', 'up')}, 1000);
              break;
            case 25:
              players[0].downs += 1;
              players[0].newPos = 3;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 40:
              players[0].downs += 1;
              players[0].newPos = 19;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 46:
              players[0].downs += 1;
              players[0].newPos = 10;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 77:
              players[0].downs += 1;
              players[0].newPos = 57;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 89:
              players[0].downs += 1;
              players[0].newPos = 49;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 94:
              if (players[0].overflow === true) {
                perfectLandMessage.text = "YOU NEED 6 TO WIN!";
                checkWin('p1', data.side);
              }
              break;
            case 95:
              if (players[0].overflow === true) {
                perfectLandMessage.text = "YOU NEED 5 TO WIN!";
                checkWin('p1', data.side);
              }
              break;
            case 96:
              if (players[0].overflow === true) {
                perfectLandMessage.text = "YOU NEED 4 TO WIN!";
                checkWin('p1', data.side);
              }
              break;
            case 97:
              if (players[0].overflow === true) {
                perfectLandMessage.text = "YOU NEED 3 TO WIN!";
                checkWin('p1', data.side);
              }
              break;
            case 98:
              if (players[0].overflow === true) {
                perfectLandMessage.text = "YOU NEED 2 TO WIN!";
                checkWin('p1', data.side);
              }
              break;
            case 99:
              players[0].downs += 1;
              players[0].newPos = 24;
              setTimeout(function () { upLadderDownSnake('p1', 'down')}, 1000);
              break;
            case 100:
              players[0].newPos = 100;
              upLadderDownSnake('p1', 'win');
              break;
            default:
              break;
          }
        }, 1000);
      }
      if (data.side === p2.side) {
        p2.updateStatic(data.diceOutcome);
        setTimeout(function () {
          createjs.Tween.get(bmpP2, { loop: false })
            .to({ x: players[1].x, y: players[1].y }, 1000, createjs.Ease.getPowInOut(4));
          switch (players[1].newPos) {
            case 5:
              players[1].ups += 1;
              players[1].newPos = 27;
              setTimeout(function () { upLadderDownSnake('p2', 'up')}, 1000);
              break;
            case 11:
              players[1].ups += 1;
              players[1].newPos = 33;
              setTimeout(function () { upLadderDownSnake('p2', 'up')}, 1000);
              break;
            case 48:
              players[1].ups += 1;
              players[1].newPos = 84;
              setTimeout(function () { upLadderDownSnake('p2', 'up')}, 1000);
              break;
            case 60:
              players[1].ups += 1;
              players[1].newPos = 78;
              setTimeout(function () { upLadderDownSnake('p2', 'up')}, 1000);
              break;
            case 73:
              players[1].ups += 1;
              players[1].newPos = 95;
              setTimeout(function () { upLadderDownSnake('p2', 'up')}, 1000);
              break;
            case 25:
              players[1].downs += 1;
              players[1].newPos = 3;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 40:
              players[1].downs += 1;
              players[1].newPos = 19;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 46:
              players[1].downs += 1;
              players[1].newPos = 10;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 77:
              players[1].downs += 1;
              players[1].newPos = 57;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 89:
              players[1].downs += 1;
              players[1].newPos = 49;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 94:
              if (players[1].overflow === true) {
                perfectLandMessage.text = "YOU NEED 6 TO WIN!";
                checkWin('p2', data.side);
              }
              break;
            case 95:
              if (players[1].overflow === true) {
                perfectLandMessage.text = "YOU NEED 5 TO WIN!";
                checkWin('p2', data.side);
              }
              break;
            case 96:
              if (players[1].overflow === true) {
                perfectLandMessage.text = "YOU NEED 4 TO WIN!";
                checkWin('p2', data.side);
              }
              break;
            case 97:
              if (players[1].overflow === true) {
                perfectLandMessage.text = "YOU NEED 3 TO WIN!";
                checkWin('p2', data.side);
              }
              break;
            case 98:
              if (players[1].overflow === true) {
                perfectLandMessage.text = "YOU NEED 2 TO WIN!";
                checkWin('p2', data.side);
              }
              break;
            case 99:
              players[1].downs += 1;
              players[1].newPos = 24;
              setTimeout(function () { upLadderDownSnake('p2', 'down')}, 1000);
              break;
            case 100:
              players[1].newPos = 100;
              upLadderDownSnake('p2', 'win');
              break;
            default:
              break;
          }
        }, 1000);
      }
    });

    socket.on('can-throw', function () {
      setTimeout(function () {
        canThrow = true;
      }, 3000);
    });

    function upLadderDownSnake (p, los) {
      this.p = p;
      this.los = los;
      if (this.p === 'p1') {
        p1.updateStaticUpDown();
        createjs.Tween.get(bmpP1, { loop: false })
          .to({ x: players[0].x, y: players[0].y }, 1000, createjs.Ease.getPowInOut(4)).call(function () {
            if (players[0].newPos === 100) {
              socket.emit('game-over', {side: players[0].side, room: token});
            }
        });
      }
      if (this.p === 'p2') {
        p2.updateStaticUpDown();
        createjs.Tween.get(bmpP2, { loop: false })
          .to({ x: players[1].x, y: players[1].y }, 1000, createjs.Ease.getPowInOut(4)).call(function () {
            if (players[1].newPos === 100) {
              socket.emit('game-over', {side: players[1].side, room: token});
            }
        });
      }
      if (this.los === 'up') {
        assetLoader.sounds.upLadder.play();
      }
      if (this.los === 'down') {
        assetLoader.sounds.downSnake.play();
      }
    }

    function checkWin (p, s) {
      if (p === 'p1') {
        if (s === side) {
          createjs.Tween.get(perfectLandIndicator, { loop: false })
            .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
            .to({ alpha: 1 }, 3000, createjs.Ease.getPowInOut(1))
            .to({ alpha: 0 }, 500, createjs.Ease.getPowInOut(2));
          createjs.Tween.get(perfectLandMessage, { loop: false })
            .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
            .to({ alpha: 1 }, 3000, createjs.Ease.getPowInOut(1))
            .to({ alpha: 0 }, 500, createjs.Ease.getPowInOut(2));
        }
      }
      if (p === 'p2') {
        if (s === side) {
          createjs.Tween.get(perfectLandIndicator, { loop: false })
            .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
            .to({ alpha: 1 }, 3000, createjs.Ease.getPowInOut(1))
            .to({ alpha: 0 }, 500, createjs.Ease.getPowInOut(2));
          createjs.Tween.get(perfectLandMessage, { loop: false })
            .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
            .to({ alpha: 1 }, 3000, createjs.Ease.getPowInOut(1))
            .to({ alpha: 0 }, 500, createjs.Ease.getPowInOut(2));
        }
      }
    }

    socket.on('game-over', function (data) {
      assetLoader.sounds.gameBgMusic.pause();
      assetLoader.sounds.gameBgMusic.currentTime = 0;
      if (data.side === 'white') {
        if (data.side === side) {
          $('#noticon').attr('src', '/images/crown.png');
          $('#gameResult').html('Congrats! You won the Game.');
          uploadStatic(players[0].username, players[0].turns, players[0].ups, players[0].downs);          
          assetLoader.sounds.winner.play();
        } else {
          $('#noticon').attr('src', '/images/oops.png');
          $('#gameResult').html('Oops! You lost the Game.');
          assetLoader.sounds.loser.play();
        }
      }
      if (data.side === 'black') {
        if (data.side === side) {
          $('#noticon').attr('src', '/images/crown.png');
          $('#gameResult').html('Congrats! You won the Game.');
          uploadStatic(players[1].username, players[1].turns, players[1].ups, players[1].downs);          
          assetLoader.sounds.winner.play();
        } else {
          $('#noticon').attr('src', '/images/oops.png');
          $('#gameResult').html('Oops! You lost the Game.');
          assetLoader.sounds.loser.play();
        }
      }
      $('#gameCanvas').css({"filter":"blur(6px)"});
      $('#gameResultPopup').show();
    });

    function uploadStatic (username,t,u,d) {
      this.username = username;
      this.t = t;
      this.u = u;
      this.d = d;
      var data = {
        username: this.username,
        turns: this.t,
        ups: this.u,
        downs: this.d
      };
      $.ajax({
        url: 'http://localhost:3000/savestatics',
        data: data,
        method: 'POST'
      }).then(function (response) {
        alert('yayyy');
      }).catch(function (err) {
        console.error(err);
      });
    }

  }

  var nbUsers, nbGames, totalGames;
  liveDash.on('update', function(data) {
    nbUsers = data.nbUsers;
    nbGames = data.nbGames;
    $("#nbUsers").html(nbUsers);
    $("#nbGames").html(nbGames);
  });

});