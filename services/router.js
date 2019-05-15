const express = require('express');
const router = new express.Router();
const fornecedores = require('../controllers/fornecedores.js');
const controles = require('../controllers/controles.js');
 
router.route(`/fornecedores/:id?`)
  .get(fornecedores.get);
 
router.route(`/controles/:id?`)
  .get(controles.get);

router.route(`/controles/acompanhamento/:id?`)
  .get(controles.acompanhamentoControle);

router.route(`/controles/:id?/:ano?/:cultura?`)
  .get(controles.importar);

router.route(`/controle/:fornecedorId?/:controleId?`)
.get(controles.visualprodutor);

router.route(`/fornecedor/:id?`)
.get(controles.fornecedor);

router.route(`/comerciais`)
  .get(fornecedores.comerciais);

router.route(`/comercial/:fornecedorId?/:controleId?`)
  .get(fornecedores.comercial);

router.route(`/img/:controleId`)
  .get(controles.images);

module.exports = router;