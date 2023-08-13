const express = require("express");
const router = express.Router();
const { addTournament, getTournament, deleteTournament, editTournament, addParticipant, deleteParticipant, getTournamentId, editParticipant } = require("../controller/tournamentController");

router.post("/add", addTournament);

router.get("/get", getTournament);

router.get("/get/:id",getTournamentId)

router.delete("/delete/:id", deleteTournament);

router.put("/edit/:id", editTournament);

router.put("/addParticipant/:id", addParticipant);

router.put("/deleteParticipant/:id", deleteParticipant);

router.put("/editParticipants/:id",editParticipant)

module.exports = router;