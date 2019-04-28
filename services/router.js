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

  router.route(`/controle/:fornecedorId?/:controleId?`)
  .get(controles.visualprodutor);

  router.route(`/fornecedor/:id?`)
  .get(controles.fornecedor);

router.route(`/comercial`)
  .get(fornecedores.comercial);


module.exports = router;