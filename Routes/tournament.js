const express = require("express");
const router = express.Router();
const { addTournament, getTournament, deleteTournament, editTournament, addParticipant, deleteParticipant } = require("../controller/tournamentController");

router.post("/add", addTournament);

router.get("/get", getTournament);

router.delete("/delete/:id", deleteTournament);

router.put("/edit/:id", editTournament);

router.put("/addParticipant/:id", addParticipant);

router.put("/deleteParticipant/:id", deleteParticipant)

module.exports = router;