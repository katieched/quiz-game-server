db.intPlayers.drop();

db.intPlayers.insertMany([
    { gameId: "7e5tg", username: "ATest", score: 300 },
    { gameId: "ga29d", username: "BTest", score: 100 },
    { gameId: "ga29d", username: "CTest", score: 600 },
    { gameId: "7e5tg", username: "DTest", score: 1000 },
    { gameId: "7e5tg", username: "ETest", score: 300 }
]);
