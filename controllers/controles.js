const controles = require('../db_apis/controles.js');
 
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
    context.ano ="" + req.params.ano;
    context.cultura = req.params.cultura ;

    console.log("dados do context em controllers" + (context.ano).substring(2,2));
    console.log(context);
 
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
 
module.exports.get = get;
module.exports.importar = importar;