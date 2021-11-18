const { init } = require("../dbConfig");

class Player {
    constructor(data) {
        this.gameId = data.gameId;
        this.username = data.username;
        this.score = data.score;
    };

    // Get all players
    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("players").find().toArray();
                const players = data.map(p => new Player({ ...p, gameId: p.gameId }));
                resolve(players);
            } catch (err) {
                reject("Error retrieving players");
            };
        });
    };

    // Get all players by a specific gameId
    static findByGameId(gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection("players").find({ gameId: gameId }).toArray();
                let players = data.map(p => new Player({ ...p, gameId: p.gameId }));
                resolve(players);
            } catch (err) {
                reject(`Players from game ${gameId} not found`);
            };
        });
    };

    // Update player's score
    static updateScore(gameId, username) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection("players").findOneAndUpdate(
                    { $and: [{ gameId: { $eq: gameId } }, { username: { $eq: username } }] },
                    { $inc: { score: 100 } },
                    { returnNewDocument: true }
                ).toArray();
                let player = new Player({ ...data[0] })
                resolve(player);
            } catch (err) {
                reject(`Player ${username} could not be updated`);
            };
        });
    };
};

module.exports = Player;
