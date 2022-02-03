const router = require("express").Router();
const nothing = require("./nothing");

router.use("/nothing", nothing);

module.exports = router;