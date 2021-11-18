const db = connect("mongodb://localhost:27017/quizDb");

db.players.drop();

db.players.insertMany([
    { gameId: "0u2u0", username: "Alice", score: 300 },
    { gameId: "js84t", username: "Ben", score: 0 },
    { gameId: "js84t", username: "Claire", score: 700 },
    { gameId: "0u2u0", username: "David", score: 300 }
]);