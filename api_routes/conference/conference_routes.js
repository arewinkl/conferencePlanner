const router = require("express").Router();
const conferenceController = require("../../controllers/conferenceController.js");
const { Conference } = require("../../models");


// matches with "/api/confrence"
router.route("/")
    .get(conferenceController.findAll)




module.exports = router;