const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
    console.log('Connected to server');

    Dishes.create({
        name:  'Creme-Brulee',
        description: 'best'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{
            new: true
        }).exec();
    })
    .then((dish)=> {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'delicious',
            author: 'Me'
        });

        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err)=> {
        console.log('error');
    });
});