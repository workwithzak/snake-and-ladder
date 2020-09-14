var express = require('express');
var User = require('../models/user');
var util = require('../config/util.js');

var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.isGame = req.body.side;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', function(req, res, next) {
  User.find()
  .sort({ turns: 'ascending' })
  .limit(7)
  .exec(function(err, users) {
    if (err) { return next(err); }
    res.render('index', {users: users});
  });
});

router.post('/play', function(req, res) {
  var side = req.body.side;
  var user = req.body.nickname;
  var createOrJoin = req.body.createOrJoin;
  var gameurl = req.body.gameurl;
  if (createOrJoin === 'join') {
    if (gameurl && gameurl.match('\/([a-zA-Z0-9]){20}\/(black|white)')) {
      res.redirect('/game/' + user + gameurl);
    } else {
      // ghalat urls ba na cheerre rorai.
    }
  }
  if (createOrJoin === 'create') {
    if (user && user.match('^[a-zA-Z0-9]{4,12}$')) {
      var token = util.randomString(20);
      res.redirect('/game/' + user + '/' + token + '/' + side);
    }
  }
});

router.get('/game/:user/:token/:side', function(req, res) {
  var token = req.params.token;
  var side = req.params.side;
  var user = req.params.user;
  User.find()
  .sort({ turns: 'ascending' })
  .limit(7)
  .exec(function(err, users) {
    if (err) { return next(err); }
    res.render('game', {
      user: user,
      users: users,
      token: token,
      side: side,
      isGame: true
    });
  });
});

router.post('/savestatics', function (req, res, next) {
  var newUser = new User ({
    username: req.body.username,
    turns: req.body.turns,
    ups: req.body.ups,
    downs: req.body.downs
  });
  newUser.save(next);
});

module.exports = router;