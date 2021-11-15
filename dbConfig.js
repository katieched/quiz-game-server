const { MongoClient } = require("mongodb");
// const uri = process.env.MONGODB_URI;
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

const init = async () => {
    try {
        let client = await MongoClient.connect(connectionUrl);
        console.log(`Connected to database ${dbName}!`);
        return client.db(dbName);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { init };