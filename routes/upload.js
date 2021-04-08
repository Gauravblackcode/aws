const express = require("express");

const router = express.Router();
const multer  = require('multer')
const AWS = require("aws-sdk");
const controllers = require("../controllers/uploadSource");

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
const upload = multer({storage}).single('file')
// to get the data from the server and render the template
router.post("/uploadSource", upload, controllers.UploadCode);
router.get("/upload", controllers.codePage);

module.exports = router;
