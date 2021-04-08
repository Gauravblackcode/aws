const express = require("express");
const router = express.Router();

const controllers = require("../controllers/loginController");
router.get("/", controllers.login);
router.post("/", controllers.loginPost);

module.exports = router;
