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