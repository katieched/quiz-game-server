const db = connect("mongodb://localhost:27017/quizDb");

db.games.drop();

db.games.insertMany([
    { difficulty: "easy", category: "Art", players: [{ name: "Arthur", score: 500 }, { name: "David", score: 0 }, { name: "Edward", score: 500 }] },
    { difficulty: "hard", category: "Sports", players: [{ name: "Arthur", score: 100 }, { name: "Charlie", score: 700 }] },
]);