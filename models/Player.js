const { init } = require("../dbConfig");
const { ObjectId } = require("mongodb");

class Player {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.gameId = data.gameId;
        this.score = data.score;
    };

    // Get all players
    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("players").find().toArray();
                const players = data.map(p => new Player({ ...p, id: p._id }));
                resolve(players);
            } catch (err) {
                reject("Error retrieving players");
            };
        });
    };

    // Get player by ID
    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("players").find({ _id: ObjectId(id) }).toArray();
                const player = new Player({ ...data[0], id: data[0]._id });
                resolve(player);
            } catch(err) {
                reject(`Error retrieving player ${id}`);
            };
        });
    };

    // Get players by game ID
    static findByGameId(gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("players").find({ gameId: ObjectId(gameId) }).toArray();
                const players = data.map(p => new Player({ ...p, gameId: p.gameId }));
                resolve(players);
            } catch (err) {
                reject(`Players from game ${gameId} not found`);
            };
        });
    };

    // Create new player
    static createPlayer(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const { name, gameId, score } = data;
                let playerData = await db.collection("players").insertOne({ name: name, gameId: ObjectId(gameId), score: score });
                console.log(playerData);
                let newPlayer = new Player(playerData.ops[0]);
                resolve(newPlayer);
            } catch (err) {
                reject("Error creating new player");
            };
        });
    };

    // Update player's score
    updatePlayer() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const updatedPlayerData = await db.collection("players").findOneAndUpdate({ id: ObjectId(this.id) }, { $inc: { score: 100 } }, { returnOriginal: false});
                let updatedPlayer = new Player(updatedPlayerData.value);
                console.log(updatedPlayer);
                resolve(updatedPlayer);
                
            } catch(err) {
                reject(`Player ${this.id} could not be updated`);
            };
        });
    };
};

module.exports = Player;