const Player = require("../models/Player");

// Index route
async function index(req, res) {
    try {
        const allPlayers = await Player.all;
        res.json({ Players: allPlayers });
    } catch (err) {
        res.status(500).json(err);
    };
};

// Show route 
async function show(req, res) {
    try {
        const players = await Player.findByGameId(req.params.gameId);
        res.json({ Players: players });
    } catch (err) {
        res.status(404).json(err);
    };
};

// Update route
async function update(req, res) {
    try {
        const player = await Player.updateScore(req.params.gameId, req.params.username);
        res.status(204).json(player);
    } catch (err) {
        res.status(400).json(err);
    };
};

module.exports = { index, show, update };