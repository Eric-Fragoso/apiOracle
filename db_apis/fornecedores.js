const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
  f.FAGR_ST_NOME AS FORNECEDOR
  from mgagr.AGR_FAGRICOLA f`;
  
async function find(context) {
  
  let query = baseQuery;
  const binds = {};
 
  console.log(context.id);
  if (context.id) {
    binds.COD_FORNECEDOR = context.id;
 
    query += `\n where f.FAGR_IN_CODIGO = :COD_FORNECEDOR`;
  }
 
  console.log(query);
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}

async function comerciala(context) {
  
  let query = baseQuery;
  const binds = {};
 
   if (context.id) {
    binds.CONTROLE = context.id;

    console.log(query);  

    query = `select * from mgagr.agr_bi_visaocomercial_dq`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
 
module.exports.find = find;
module.exports.comerciala = comerciala;