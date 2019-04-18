const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
  f.FAGR_ST_NOME AS FORNECEDOR
  from mgagr.AGR_FAGRICOLA f ORDER BY FORNECEDOR ASC `;
  
async function find(context) {
  console.log("executou");
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.COD_FORNECEDOR = context.id;
 
    query += `\nwhere COD_FORNECEDOR = :COD_FORNECEDOR`;
  }
 
  console.log(query);
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;