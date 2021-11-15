const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.index);
router.get("/players", gamesController.indexPlayers)
router.get("/:id", gamesController.show);
router.post("/", gamesController.create);
router.delete("/:id", gamesController.destroy);

module.exports = router;