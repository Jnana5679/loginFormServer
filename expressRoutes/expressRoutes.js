const express = require("express");
const router = express.Router();

//middlewear functions
const doesUserExitInDataBase = require("./middlewears/doesUserExist");
const validateJsonToken = require("./middlewears/validateToken");

//routes controllers
const login = require("./controllers/login");
const signup = require("./controllers/signUp");
const getDetails = require("./controllers/details");
const UpdateUserPassword = require("./controllers/updatePassword");

router.post("/login", login);
router.post("/signup", doesUserExitInDataBase, signup);
router.get("/getDetails", validateJsonToken, getDetails);
router.post("/updatepassword", validateJsonToken, UpdateUserPassword);

module.exports = router;
