const express = require("express");
const router = express.Router();
const multer  = require('multer')
// const upload = multer({dest:'uploads/'})
const controllers = require("../controllers/bucketListController");
// const Swal = require('sweetalert2');
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
// const upload = multer({storage}).single('file')
const upload = multer({storage}).array('file')


router.get("/list", controllers.initListPage);
router.post("/list", controllers.BucketsList);
router.post("/upload" ,upload, controllers.uploadSourceCode);

module.exports = router;
