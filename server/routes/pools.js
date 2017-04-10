const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const pkgJson = require('../../package.json');

router.use(function(req, res, next) {
  console.log('Request on /api/pools');
  next();
})

// define model =================
var Tournament     = require('../../src/app/models/tournament');

// routes ======================================================================

// api/pools--------------------------------------------------------------------
// get all Pools
router.route('/')
.get(function (req, res) {
  console.log('SERVER : Get all Pools');

});

module.exports = router;
