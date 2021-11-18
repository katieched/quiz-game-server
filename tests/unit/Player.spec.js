const Player = require("../../models/Player");

const { MongoClient } = require('mongodb');

describe("Player", () => {
    let client;
    let db;

    beforeAll(async () => {
        try {
            const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.azpqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
            const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            let dbName = process.env.DB_NAME;
            client = await mongoClient.connect();
            db = await client.db(dbName);
        }
        catch (err) {
            console.log(err);
        };
    });

    afterAll(async () => {
        await client.close();
    });

    describe("all", () => {
        test("It resolves with all players on a successful db query", async () => {
            // const mockPlayer = { gameId: "abc12", username: "User1", score: 100 };
            // await db.collection("unitPlayers").insertOne(mockPlayer);
            const all = await Player.all;
            expect(all[0].gameId).toBe("0u2u0");
            expect(all[0].username).toBe("Alice");
            expect(all[0].score).toBe(300);
        });
    });

    describe("findByGameId", () => {
        test("It resolves with all players in a specific game on a successful db query", async () => {
            // const mockPlayer1 = { gameId: "abc12", username: "User1", score: 100 };
            // const mockPlayer2 = { gameId: "abc12", username: "User2", score: 400 };
            // await db.collection("unitPlayers").insertMany(mockPlayer1, mockPlayer2);
            const players = await Player.findByGameId("0u2u0");
            expect(players).toHaveLength(2);
            expect(typeof players[0]).toBe("object");
            expect(players[0].gameId).toBe("0u2u0");
            expect(players[1].username).toBe("David");
            expect(players[0].score).toBe(300);
        });
    });

    describe("updateScore", () => {
        test("It resolves with the updated player on a successful db query", async () => {
            // const mockPlayer1 = { gameId: "abc12", username: "User1", score: 100 };
            // const mockPlayer2 = { gameId: "abc12", username: "User2", score: 400 };
            // await db.collection("unitPlayers").insertMany(mockPlayer1, mockPlayer2);
            await db.collection("players").findOneAndUpdate(
                { $and: [{ gameId: { $eq: "js84t" } }, { username: { $eq: "Ben" } }] },
                { $set: { score: 0 } },
                { returnNewDocument: true }
            );
            await Player.updateScore("js84t", "Ben");
            let result = await db.collection("players").find({ $and: [{ gameId: { $eq: "js84t" } }, { username: { $eq: "Ben" } }] }).toArray();
            expect(typeof result[0]).toBe("object");
            expect(result[0].score).toBe(100);
        });
    });
});