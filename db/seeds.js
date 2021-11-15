const db = connect("mongodb://localhost:27017/quiz");

db.games.drop();
db.players.drop();

db.games.insertMany([
    { id: 1, difficulty: "easy", category: "Art" },
    { id: 2, difficulty: "hard", category: "Sports" },
]);

db.players.insertMany([
    { id: 1, name: "Arthur", gameId: 2, score: 300 },
    { id: 2, name: "Ben", gameId: 1, score: 500 },
    { id: 3, name: "Charlie", gameId: 2, score: 700 },
    { id: 4, name: "David", gameId: 1, score: 0 },
    { id: 5, name: "Edward", gameId: 1, score: 500 },
]);

