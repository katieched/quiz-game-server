const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");

router.get("/", playersController.index);
router.get("/:gameId", playersController.show);
router.post("/", playersController.create);

module.exports = router;
