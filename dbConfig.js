const { MongoClient } = require("mongodb");
require('dotenv').config();

const init = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.azpqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let dbName = process.env.DB_NAME;

    try {
        let client = await mongoClient.connect();
        console.log(`Connected to database ${dbName}!`);
        return client.db(dbName);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { init };