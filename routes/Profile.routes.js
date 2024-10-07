const express = require("express");
const { HandleUserJobProfile } = require("../controller/UserJobProfile.Controller");

const router = express.Router();

router.post("/profile", HandleUserJobProfile);

module.exports = router;