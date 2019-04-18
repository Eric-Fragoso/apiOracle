const fornecedores = require('../db_apis/fornecedores.js');
 
async function get(req, res, next) {
  console.log("entrou na função");
  try {
    console.log("entrou no try");
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await fornecedores.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        console.log("erro 1");
        res.status(200).json(rows[0]);
      } else {
        console.log("erro 2");
        res.status(404).end();
      }
    } else {
      console.log("sucesso");
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;