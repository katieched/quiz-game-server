const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");

router.get("/", playersController.index);
router.get("/:id", playersController.show)
router.get("/game/:gameId", playersController.showByGameId);
router.put("/:gameId", playersController.updatePlayer);
// router.post("/", playersController.create);
router.put("/:id", playersController.update);

module.exports = router;
