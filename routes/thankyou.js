const express = require('express');
const router = express.Router();

router.get('/thankyou', (req, res, next) => {
    res.render('thankyou')
})