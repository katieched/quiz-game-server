const Player = require("../../models/Player");
// jest.mock("../../models/Player");
const allPlayers =
    [
        { gameId: "7e5tg", username: "ATest", score: 300 },
        { gameId: "ga29d", username: "BTest", score: 100 },
        { gameId: "ga29d", username: "CTest", score: 600 },
        { gameId: "7e5tg", username: "DTest", score: 1000 },
        { gameId: "7e5tg", username: "ETest", score: 300 }
    ]

const filteredPlayers = [
    { gameId: "7e5tg", username: "ATest", score: 300 },
    { gameId: "7e5tg", username: "DTest", score: 1000 },
    { gameId: "7e5tg", username: "ETest", score: 300 }
]

const updatedPlayer = { gameId: "ga29d", username: "CTest", score: 700 };

describe("Player endpoints", () => {
    let api;

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'));

        await resetTestDB();
    });

    afterAll(async () => {
        await api.close();
        console.log('Gracefully stopping test server');
    });

    it("Should return an array of all players", async () => {
        // Player.mockImplementation(() => {
        //     return {
        //         all: () => {
        //             throw new Error('Test error');
        //         },
        //     };
        // });
        console.log("Player.all", Player);
        jest.spyOn(Player, 'all', 'get').mockResolvedValueOnce(allPlayers);
        console.log("player class", Player)

        const result = await request(api).get("/players");
        console.log("result:", result.body);
        expect(result.statusCode).toBe(200);
        expect(result.body.Players).toHaveLength(5);
    });

    it("Should return an array of all players in a specific existing game", async () => {
        jest.spyOn(Player, 'findByGameId').mockResolvedValueOnce(filteredPlayers);
        const result = await request(api).get("/players/7e5tg");
        expect(result.statusCode).toBe(200);
        expect(result.body.Players).toHaveLength(3);
    });

    // it("Should return an empty array if specific game does not exist", async () => {
    //     const result = await request(api).get("/players/re9y2");
    //     expect(result.statusCode).toBe(200);
    //     expect(result.body.length).toHaveLength(0);
    // });

    it("Should return the updated document where the player's score has increased", async () => {
        jest.spyOn(Player, 'updateScore').mockResolvedValueOnce(updatedPlayer);
        const result = await request(api).put("/players/ga29d/CTest");
        console.log("result body", result)
        expect(result.statusCode).toBe(204);
        expect(result.score).toEqual(700);
    });
});