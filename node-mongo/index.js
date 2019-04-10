const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client)=> {
    assert.equal(err, null);
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "funghi", "description": "mashrooms"} , (err, result) =>{
        assert.equal(err,null);

        console.log('After insert');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log('Found:');
            console.log(docs);

            db.dropCollection('dishes', (err, result)=> {
                assert.equal(err, null);

                console.log('Found:');
                console.log(docs);

                client.close();
            })
        });
    });
});