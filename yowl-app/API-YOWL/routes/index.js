var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Et c'est partie pour le show !");

});

module.exports = router;
