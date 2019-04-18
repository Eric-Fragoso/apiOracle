const express = require('express');
const router = express.Router();
const fornecedores = require('../controllers/fornecedores.js');
 
router.route(`/fornecedores/:id?`)
  .get(fornecedores.get);
 
module.exports = router;