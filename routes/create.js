const express = require("express");
const router = express.Router();
const controllers = require("../controllers/createBucket")
const AWS = require("aws-sdk");

// to initialize the create bucekt section
router.get("/create", function (req, res, next) {
  res.render("create", { err: false});
});

// to post the data to the aws server to create the bucket
router.post("/create", controllers.AddNewBucket);

module.exports = router;
