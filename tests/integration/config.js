const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const resetTestDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.azpqf.mongodb.net/${process.env.TEST_INT_DB_NAME}?retryWrites=true&w=majority`;
            const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            let dbName = process.env.TEST_INT_DB_NAME;
            let client = await mongoClient.connect();
            client.db(dbName);
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
};

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;