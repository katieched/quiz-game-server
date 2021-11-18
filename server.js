const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the quiz game!'));

const playersRoutes = require("./routes/players");

app.use("/players", playersRoutes);

module.exports = app;