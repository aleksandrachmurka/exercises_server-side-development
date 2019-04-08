const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promotions to you');
})
.post((req, res, next)=> {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.value);
})
.put((req, res, next)=> {
    res.statusCode = 403;
    res.end('PUT not supported');
})
.delete((req, res, next)=> {
    res.end('Deleting all the promotions!');
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send you details of promotion: ' + req.params.promoId);
})
.post((req, res, next)=> {
    res.statusCode = 403;
    res.end('POST not supported on promotion');
})
.put((req, res, next)=> {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details ' + req.body.value);
})
.delete((req, res, next)=> {
    res.end('Deleting the promotion: ' + req.params.promoId);
});

module.exports = promoRouter;