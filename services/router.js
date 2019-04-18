const express = require('express');
const router = new express.Router();
const controles = require('../controllers/controles.js');
 
router.route('/controles/:id?')
  .get(controles.get);
 
module.exports = router;