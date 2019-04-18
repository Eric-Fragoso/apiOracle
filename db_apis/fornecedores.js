const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO "id",
f.FAGR_ST_NOME "nome"
from mgagr.AGR_FAGRICOLA `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f.FAGR_IN_CODIGO = context.id;
 
    query += `\nwhere f.FAGR_IN_CODIGO = :f.FAGR_IN_CODIGO`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;