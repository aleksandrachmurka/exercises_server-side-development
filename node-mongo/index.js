const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url).then((client)=> {
    
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    
    dboperations.insertDocument(db, {name: 'Donut', description: 'cinammon'}, 
    'dishes')
    .then((result) => {
        console.log('Insert: ', result.ops);
        return dboperations.findDocuments(db, 'dishes');
    })
    .then((docs) => {
        console.log('Found: ', docs);
        return dboperations.updateDocument(db, {name: 'Donut'}, {description: 'Upgraded with chocolate'}, 'dishes');
    })
    .then((result) => {
        console.log('Updated: ', result.result);
        return dboperations.findDocuments(db, 'dishes');
    })
    .then((docs) => {
        console.log('Found: ', docs);
        return db.dropCollection('dishes');
    })
    .then((result) => {
        console.log('Dropped: ', result);
        return client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));