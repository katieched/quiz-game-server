const express = require("express");
const cors = require("cors");
const app = express();

// const { app, server, io, initialise } = require("./socket/server");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the quiz game!'));

const gamesRoutes = require("./routes/games");

app.use("/games", gamesRoutes);

// io.on("connection", socket => initialise(socket));

module.exports = app;