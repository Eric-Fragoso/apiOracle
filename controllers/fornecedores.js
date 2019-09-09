const fornecedores = require('../db_apis/fornecedores.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;
 
    const rows = await fornecedores.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
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


async function comercial(req, res, next) {
  try {
    const context = {};

    context.fornecedorId = req.params.fornecedorId;
    context.controleId = req.params.controleId;
    const rows = await fornecedores.comercial(context);
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


async function comerciais(req, res, next) {
  try {
    const context = {};
 
    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;
 
    const rows = await fornecedores.comerciais(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
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

async function comercialControle(req, res, next) {
  try {
    const context = {};
    
    context.fornecedorId = req.params.fornecedorId;
    context.controleId = req.params.controleId;
    console.log(context);
    const rows = await fornecedores.comercialControle(context);
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

module.exports.comerciais = comerciais;
module.exports.comercial = comercial;
module.exports.comercialControle = comercialControle;
module.exports.get = get;