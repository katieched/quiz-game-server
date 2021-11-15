const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.send('Welcome to the quiz game!'));

const playersRoutes = require("./routes/players");
server.use("/players", playersRoutes);


module.exports = server;