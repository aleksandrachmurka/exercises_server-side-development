const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../authenticate');

const Favorites = require('../models/favorite');

const favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);   
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if (favorites.length > 0) {
            let isDuplicate = false;
            favorites[0].dishes.forEach(function(dish){
                if (dish._id == req.body._id) {
                    isDuplicate = true;
                }
            })
            if (!isDuplicate) {
                favorites[0].dishes.push(req.body);       
                favorites[0].save()
                .then((favorites) => {
                    Favorites.find({user: req.user._id})
                    .populate('user')
                    .populate('dishes')
                    .then(favorites => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites); 
                    })               
                }, (err) => next(err));
            } else {
                err = new Error('Dish already added');
                err.status = 404;
                return next(err);
            }
        }
        else  {
            Favorites.create({user: req.user._id, dishes: [] })
            .then((favorites) => {
                favorites.dishes.push(req.body);
                favorites.save()
                .then((favorites) => {
                    Favorites.find({user:req.user._id})
                    .populate('user')
                    .populate('dishes')
                    .then(favorites => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites); 
                    })    
                })           
            }, (err) => next(err));
        }
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    res.statusCode = 403;
    res.end('PUT not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if (favorites.length > 0) {
            favorites[0].remove();
            favorites[0].save()
            Favorites.find({user: req.user._id})
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err));           
        } else {
            err = new Error('Favorites of user ' + req.user._id + ' do not exist');
            err.statys = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err)=> next(err));
});

favoritesRouter.route('/:dishId')
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.find({user: req.user._id})
    .then((favorites) => {
        if (favorites.length > 0) {
            let isDuplicate = false;
            favorites[0].dishes.forEach(function(dish){
                if (dish._id == req.params.dishId) {
                    isDuplicate = true;
                }
            })
            if (!isDuplicate) {
                favorites[0].dishes.push(req.params.dishId);       
                favorites[0].save()
                .then((favorites) => {
                    Favorites.find({user: req.user._id})
                    .populate('user')
                    .populate('dishes')
                    .then(favorites => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites); 
                    })               
                }, (err) => next(err));
            } else {
                err = new Error('Dish already added');
                err.status = 404;
                return next(err);
            }
        }
        else  {
            Favorites.create({user: req.user._id, dishes: [req.params.dishId] })
            .then((favorites) => {
                favorites.save()
                .then((favorites) => {
                    Favorites.find({user:req.user._id})
                    .populate('user')
                    .populate('dishes')
                    .then(favorites => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites); 
                    })    
                })           
            }, (err) => next(err));
        }
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res ) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({user: req.user._id})
    .then((favorites) => {
        if (favorites.length > 0) {
            let indexToDelete = -1
            favorites[0].dishes.forEach(function(dish){
                if (dish._id == req.params.dishId) {
                    indexToDelete = favorites[0].dishes.indexOf(dish._id)
                }
            })
            if (indexToDelete >= 0) {
                favorites[0].dishes.splice(indexToDelete, 1);
                favorites[0].save();
                Favorites.find({user: req.user._id})
                .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                }, (err) => next(err));      
            }   else {
                err = new Error('Dish ' + req.params.dishId + ' is not on the list');
                err.statys = 404;
                return next(err);
            }
        } else {
            err = new Error('Favorites of user ' + req.user._id + ' do not exist');
            err.statys = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err)=> next(err));
});

module.exports = favoritesRouter;