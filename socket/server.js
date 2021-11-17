// const express = require("express");
// const app = express();

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// const { router } = require("../routes/games");



io.on('connection', socket => {
    console.log("'Ello, who's this we got here?"); // runs when client first connects

    // get total number of client connections
    const playersCount = io.engine.clientsCount;

    // Send event only to new connecting clients
    socket.emit('Admin', 'Welcome to the Quiz!');
    // send event to all other clients (not new connecting client)
    socket.broadcast.emit('Admin', 'A new player has joined the game!')
    // send event to all clients
    io.emit('Admin', `There are ${playersCount} players currently playing!`)

    socket.on('create game', (roomId) => {
        console.log('created room', roomId);
        socket.join(roomId);
    })

    socket.on('join game', (roomId) => {
        console.log(`joined game ${roomId.roomId}`);
        socket.join(roomId);

        io.in(roomId).emit('Admin', 'A new player has joined the game.');
    })

    // Join game

    // Update players' score

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

module.exports = httpServer;