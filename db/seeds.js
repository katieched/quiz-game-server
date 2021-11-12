const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const init = async () => {
    try {
        let client = await MongoClient.connect(uri);
        console.log('connected to database!');
        return client.db("QuizDB");
    } catch (error){
        console.log(error);
    }
}

module.exports = { init };