const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.index);
router.get("/players", gamesController.indexPlayers)
router.get("/:id", gamesController.show);
router.get("/:id/:name", gamesController.showPlayer);
router.post("/", gamesController.create);
router.post("/:id", gamesController.createPlayer);
router.put("/:id/:name", gamesController.updateScore)
router.delete("/:id", gamesController.destroy);

module.exports = router;