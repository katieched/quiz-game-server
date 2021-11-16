const Game = require("../models/Game");

// Index routes
async function index(req, res) {
    try {
        const allGames = await Game.all;
        res.json({ Games: allGames });
    } catch (err) {
        res.status(500).json(err);
    };
};

async function indexPlayers(req, res) {
    try {
        const allPlayers = await Game.allPlayers;
        res.json({ Players: allPlayers });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Show routes
async function show(req, res) {
    try {
        const game = await Game.findById(req.params.id);
        res.json({ Game: game });
    } catch (err) {
        res.status(404).json(err);
    };
};

async function showPlayer(req, res) {
    try {
        const game = await Game.findById(req.params.id);
        const player = await game.findPlayerByName(req.params.name);
        res.json({ Player: player });
    } catch(err) {
        res.status(404).json(err);
    }
}

// Create routes
async function create(req, res) {
    try {
        const { difficulty, category, players } = req.body;
        const newGame = await Game.createGame(difficulty, category, players);
        res.status(201).json({ Game: newGame });
    } catch (err) {
        res.status(422).json(err);
    };
};

async function createPlayer(req, res) {
    try {
        const { name } = req.body;
        const newPlayer = await Game.createPlayer(name, req.params.id);
        res.status(201).json({ Player: newPlayer });
    } catch(err) {
        res.status(422).json(err);
    };
}

// Delete route
async function destroy(req, res) {
    try {
        const gameToDelete = await Game.findById(req.params.id);
        await gameToDelete.destroyGame();
        res.status(204).json("Game successfully deleted");
    } catch (err) {
        res.status(500).json(err);
    };
};

module.exports = { index, indexPlayers, show, showPlayer, create, createPlayer, destroy };