const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('shop.js', adminData.products);
    res.render('shop')
});

module.exports = router;