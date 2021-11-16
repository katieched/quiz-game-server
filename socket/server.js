const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const { Game } = require("../models/Game");

function initialise(socket) {
    console.log("'Ello, who's this we got here?"); // runs when client first connects

    // get total number of client connections
    const playersCount = io.engine.clientsCount;

    // Send event only to new connecting clients
    socket.emit('Admin', 'Welcome to the Quiz!');
    // send event to all other clients (not new connecting client)
    socket.broadcast.emit('Admin', 'A new player has joined the game!')
    // send event to all clients
    io.emit('Admin', `There are ${playersCount} players currently playing!`)

    // Create game
    socket.on('create game', ({ username, message }) => {
        socket.broadcast.emit('incoming-message', { username, message })
        socket.emit('Admin', 'message sent')
    })

    // Join game

    // Update players' score

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
};

module.exports = { app, server, io, initialise };