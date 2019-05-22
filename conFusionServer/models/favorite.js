const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    } ]
}, {
    timestamps: true
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;