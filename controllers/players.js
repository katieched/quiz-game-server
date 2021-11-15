const Player = require("../models/Player");

// Index route
// async function index(req, res) {
//     try {
//         const allPlayers = await Player.all;
//         res.json({ Players: allPlayers });
//     } catch (err) {
//         res.status(500).json(err);
//     };
// };

// // Show routes
// async function show(req, res) {
//     try {
//         const player = await Player.findById(req.params.id);
//         res.json({ Player: player });
//     } catch(err) {
//         res.status(404).json(err);
//     }
// }

// async function showByGameId(req, res) {
//     try {
//         const players = await Player.findByGameId(req.params.gameId);
//         res.json({ Players: players });
//     } catch (err) {
//         res.status(404).json(err);
//     };
// };

// // Update route
// async function updatePlayer(req, res) {
//     try {
//         const newPlayer = await Player.addPlayer(req.params.gameId, req.body);
//         res.status(201).json({ Player: newPlayer });
//     } catch (err) {
//         res.status(422).json(err);
//     };
// };

// // // Update route
// async function update(req, res) {
//     try {
//         const player = await Player.findById(req.params.id);
//         const updatedPlayer = await player.updatePlayer();
//         res.status(204).json(updatedPlayer);
//     } catch(err) {
//         res.status(400).json(err);
//     };
// };

// module.exports = { index, show, showByGameId, updatePlayer, update };
