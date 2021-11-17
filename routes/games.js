const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.index);
router.get("/players", gamesController.indexPlayers)
router.get("/:gameId", gamesController.show);
router.get("/:gameId/:name", gamesController.showPlayer);
router.post("/", gamesController.create);
router.post("/:gameId", gamesController.createPlayer);
router.put("/:gameId/:name", gamesController.updateScore)
router.delete("/:gameId", gamesController.destroy);

module.exports = router;