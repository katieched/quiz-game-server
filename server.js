const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.send('Welcome to the quiz game!'));

const gamesRoutes = require("./routes/games");

server.use("/games", gamesRoutes);

module.exports = server;