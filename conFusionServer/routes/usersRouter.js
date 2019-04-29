var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');

let usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

usersRouter.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then(user => {
    if (user != null) {
      let err = new Error('User already exists');
      err.status = 403;
      next(err);
    } else {
      return User.create({
        username: req.body.username, 
        password: req.body.password});
    }
  })
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration seccessful', user: user});
  }, err => next(err))
  .catch(err => next(err));
});

usersRouter.post('/login', (req, res, next) => {
  if (!req.session.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    let auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString().split(':');
    let username = auth[0];
    let password = auth[1];
    User.findOne({username:username})
    .then(user =>{
      if (user === null) {
        let err = new Error('User does not exist');
        err.status = 403;
        return next(err);
      } else if (user.password !== password) {
        let err = new Error('Password incorrect');
        err.status = 403;
        return next(err);
      } else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated');
      }
    })
    .catch(err => next(err));
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
});

usersRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = usersRouter;