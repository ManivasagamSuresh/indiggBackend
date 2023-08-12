const express = require("express");
const router = express.Router();
const { signUp, login, getUser, editUser, deleteUser } = require("../controller/userController");

router.post("/signup", signUp)


router.post("/login", login)


router.get("/get", getUser)

router.put("/edit/:id", editUser)


router.delete("/delete/:id", deleteUser)


module.exports = router;