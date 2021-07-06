const express = require("express");
const { registerUser, authUser,getUser , checkUser } = require("../controllers/users.controller");
const router = express.Router();

router.param("uid" , checkUser);
router.route("/:uid").post(getUser)
router.route("/signup").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;