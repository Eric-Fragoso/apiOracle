const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
  f.FAGR_ST_NOME AS FORNECEDOR
  from mgagr.AGR_FAGRICOLA  `;
  
async function find(context) {
  
  let query = baseQuery;
  const binds = {};
 
  console.log(context.id);
  if (context.id) {
    binds.COD_FORNECEDOR = context.id;
 
    query += `\nwhere COD_FORNECEDOR = :COD_FORNECEDOR`;
  }
 
  console.log(query);
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;