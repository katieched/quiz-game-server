const { init } = require("../dbConfig");
const { ObjectId } = require("mongodb");

class Game {
    constructor(data) {
        this.id = data._id;
        this.difficulty = data.difficulty;
        this.category = data.category;
        this.players = data.players;
    };

    // Get all games
    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("games").find().toArray();
                const games = data.map(g => new Game({ ...g, id: g._id }));
                resolve(games);
            } catch (err) {
                reject("Error retrieving games");
            };
        });
    };

    // Get all players in every game
    static get allPlayers() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("games").find().toArray();
                const players = data.map(g => new Game({ _id: g._id, players: g.players }));
                resolve(players);
            } catch (err) {
                reject("Error retrieving players");
            };
        });
    };

    // Get game by ID
    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection("games").find({ _id: ObjectId(id) }).toArray();
                let game = new Game({ ...data[0], id: data[0]._id });
                resolve(game);
            } catch (err) {
                reject(`Game ${id} not found`);
            };
        });
    };

    // Get player by name and gameId
    findPlayerByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection("games").find(
                    { _id: ObjectId(this.id) },
                    {
                        "players":
                            { "name": name, "score": 0 }
                    }
                ).toArray();
                const index = data[0].players.findIndex(i => i.name === name);
                const player = new Game({ _id: ObjectId(this.id), players: data[0].players[index] });
                resolve(player);
            } catch (err) {
                reject(`Error retrieving player ${name}`);
            };
        });
    };

    // Create new game
    static createGame(difficulty, category, players) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let gameData = await db.collection('games').insertOne({ difficulty: difficulty, category: category, players: players });
                let newGame = new Game(gameData.ops[0]);
                resolve(newGame);
            } catch (err) {
                reject("Error creating new game");
            };
        });
    };

    // Create new player
    static createPlayer(name, gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let playerData = await db.collection('games').updateOne({ _id: ObjectId(gameId) }, { $push: { players: { name: name, score: 0 } } });
                let newPlayer = new Game(playerData.ops[0]);
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
                // const updatedPlayerData = await db.collection("games").findOneAndUpdate(
                //     { $and: [{ _id: ObjectId(this.id) }, { "name": this.name }] },
                //     // { "name": this.name },
                //     // { _id: ObjectId(this.id) },
                //     { $inc: { "players[0].score": 100 } },
                //     { returnOriginal: false }
                // );

                // const data = await db.collection("games").find(
                //     { $and: [{ _id: ObjectId(this.id) }, { "name": this.name }] }
                // ).toArray();
                // console.log("data", data)
                // const index = data[0].players.findIndex(i => i.name === this.players.name);
                // console.log("index", index)
                // const player = data[0].players[index]
                // console.log("player: ", player);

                // Try and use name when increasing
                // const updatedPlayerData = await db.collection("games").updateOne(
                //     { $and: [{ _id: ObjectId(this.id) }, { "name": this.name }] },
                //     { $inc: { players: { score: 100 } } }
                // );
                // console.log("updated", updatedPlayerData);
                // let updatedPlayer = new Game(updatedPlayerData.ops[0]);
                // console.log(updatedPlayer);
                resolve(updatedPlayerData);
            } catch (err) {
                reject(`Player ${this.players.name} could not be updated`);
            };
        });
    };

    // Delete game
    destroyGame() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection("games").deleteOne({ _id: ObjectId(this.id) });
                resolve(`Game ${this.id} has been deleted`);
            } catch (err) {
                reject(`Game ${this.id} could not be deleted`);
            };
        });
    };
};

module.exports = Game;