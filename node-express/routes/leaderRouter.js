const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.hobby);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders!');
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will sedn you details of leader: ' + req.params.leaderId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put((req, res, next) => {
    res.write('Will update leader ' + req.params.leaderId + '\n');
    res.end('Updating leader with: ' + req.body.name + ' with details ' + req.body.hobby); 
})
.delete((req, res, next) => {
    res.end('Deleting leader ' + req.params.leaderId);
});

module.exports = leaderRouter;