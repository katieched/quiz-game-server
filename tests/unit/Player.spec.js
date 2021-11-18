const Player = require("../../models/Player");

const { MongoClient } = require('mongodb');

describe("Player", () => {
    let client;
    let db;

    beforeAll(async () => {
        try {
            const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.azpqf.mongodb.net/${process.env.TEST_UNIT_DB_NAME}?retryWrites=true&w=majority`;
            const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            let dbName = process.env.TEST_UNIT_DB_NAME;
            client = await mongoClient.connect();
            db = await client.db(dbName);
        }
        catch (err) {
            console.log(err);
        };
    });

    // afterAll(async () => {
    //     await client.close();
    //     await db.close();
    // });

    describe("all", () => {
        test("It resolves with all players on a successful db query", async () => {
            const mockPlayer = { gameId: "abc12", username: "User1", score: 100 };
            await db.collection("unitPlayers").insertOne(mockPlayer);
            const all = await Player.all;
            expect(all.Players).toHaveLength(1);
            expect(all.Players[0].gameId).toBe("abc12");
            expect(all.Players[0].username).toBe("User");
            expect(all.Players[0].score).toBe(100);
        });
    });

    // describe("findByGameId", () => {
    //     test("It resolves with all players in a specific game on a successful db query", async () => {
    //         const mockPlayer1 = { gameId: "abc12", username: "User1", score: 100 };
    //         const mockPlayer2 = { gameId: "abc12", username: "User2", score: 400 };
    //         await db.collection("unitPlayers").insertMany(mockPlayer1, mockPlayer2);
    //         const players = await Player.findByGameId("abc12");
    //         expect(players.Players).toHaveLength(2);
    //         expect(typeof players.Players[0]).toBe("object");
    //         expect(players.Players[0].gameId).toBe("abc12");
    //         expect(players.Players[1].username).toBe("User2");
    //         expect(players.Players[0].score).toBe(100);
    //     });
    // });

    // describe("updateScore", () => {
    //     test("It resolves with the updated player on a successful db query", async () => {
    //         const mockPlayer1 = { gameId: "abc12", username: "User1", score: 100 };
    //         const mockPlayer2 = { gameId: "abc12", username: "User2", score: 400 };
    //         await db.collection("unitPlayers").insertMany(mockPlayer1, mockPlayer2);
    //         const player = await Player.updateScore("abc12", "User2");
    //         expect(player).toHaveLength(1);
    //         expect(players.Players[0].score).toBe(100);
    //         expect(players.Players[1].score).toBe(500);
    //     });
    // });
});