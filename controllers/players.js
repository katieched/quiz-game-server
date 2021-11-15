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

module.exports = { index, show };