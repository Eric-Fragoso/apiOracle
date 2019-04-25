const express = require('express');
const router = new express.Router();
const fornecedores = require('../controllers/fornecedores.js');
const controles = require('../controllers/controles.js');
 
router.route(`/fornecedores/:id?`)
  .get(fornecedores.get);
 
router.route(`/controles/:id?`)
  .get(controles.get);

router.route(`/controles/:id?/:ano?/:cultura?`)
  .get(controles.importar);

router.route(`/controles/fornecedor/:id?`)
  .get(controles.fornecedor);

module.exports = router;