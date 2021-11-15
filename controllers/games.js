const Game = require("../models/Game");

// Index route
async function index(req, res) {
    try {
        const allGames = await Game.all;
        res.json({ Games: allGames });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Show route
async function show(req, res) {
    try {
        const game = await Game.findById(req.params.id);
        res.json({ Game: game });
    } catch (err) {
        res.status(404).json(err);
    };
};

// Create route
async function create(req, res) {
    try {
        const newGame = await Game.createGame(req.body);
        res.status(201).json({ Game: newGame });
    } catch (err) {
        res.status(422).json(err);
    };
};

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

module.exports = { index, show, create, destroy };