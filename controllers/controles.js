const controles = require('../db_apis/controles.js');
const path = require('path');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;

    const rows = await controles.find(context);
    if (req.params.id) {
      if (rows.length != 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function importar(req, res, next) {
  try {
    const context = {};
 
    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;
    context.ano = " 20" + req.params.ano;
    context.cultura = req.params.cultura+req.params.ano ;

    const rows = await controles.importa(context);
    if (req.params.id) {
      if (rows.length != 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function fornecedor(req, res, next) {
  try {
    const context = {};
 
    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;

    const rows = await controles.fornecedor(context);
    if (req.params.id) {
      if (rows.length != 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function visualprodutor(req, res, next) {
  
  try {
    const context = {};

    context.fornecedorId = req.params.fornecedorId;
    context.controleId = req.params.controleId;
    const rows = await controles.visualprodutor(context);
    if (req.params.fornecedorId) {
      if (rows.length != 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}


async function images(req, res, next) {
  console.log("entrou",req.params);
    var context = "";
 
    context = req.params.controleId;

   //res.status(200).send(`
   //       <h1>Testando ver se leva o HTML </h1>
   //       <img src="img/${context}.jpg" alt="Smiley face">
   //       <img src="../img/${context}.jpg" alt="Smiley face">
  // `);
   res.status(200).send(path.resolve(__dirname));

}

module.exports.images = images;
module.exports.visualprodutor = visualprodutor;
module.exports.get = get;
module.exports.importar = importar;
module.exports.fornecedor = fornecedor;