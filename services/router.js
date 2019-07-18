const express = require('express');
const router = new express.Router();
const fornecedores = require('../controllers/fornecedores.js');
const controles = require('../controllers/controles.js');
 
router.route(`/fornecedores/:id?`)
  .get(fornecedores.get);
 
router.route(`/controles/:id?`)
  .get(controles.get);

router.route(`/controles/acompanhamento/:id?/:ano?/:cultura?`)
  .get(controles.acompanhamentoControle);

router.route(`/controles/:id?/:ano?/:cultura?`)
  .get(controles.importa);

router.route(`/controlessel/:id?/:ano?/:cultura?`)
.get(controles.exibesel);

router.route(`/controlesemb/:id?/:ano?/:cultura?`)
.get(controles.exibeemb);

router.route(`/controlesexp/:id?/:ano?/:cultura?`)
.get(controles.exibeexp);

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