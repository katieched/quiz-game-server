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
};

module.exports = Player;

// db.players.find({ gameId: ObjectId('619243da0a71210ff02646d8') });