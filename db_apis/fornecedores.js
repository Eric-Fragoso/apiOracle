const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
  f.FAGR_ST_NOME AS FORNECEDOR
  from mgagr.AGR_FAGRICOLA f order by FORNECEDOR`;
  
async function find(context) {
  
  let query = baseQuery;
  const binds = {};
 
  console.log(context);
  if (context.id) {
    binds.COD_FORNECEDOR = context.id;
 
    query += `\n where COD_FORNECEDOR = :COD_FORNECEDOR`;
  }
  
  console.log(query);
  const result = await database.simpleExecute(query, binds);
 console.log(result.rows);
  return result.rows;
}

async function comerciais(context) {
  
  let query = baseQuery;
  const binds = {};
 
  query = `select * from mgagr.agr_bi_visaocomercial_dq`;
   if (context.id) {
    binds.CONTROLE = context.id;

    query = `select * from mgagr.agr_bi_visaocomercial_dq `;
  }

  const result = await database.simpleExecute(query, binds);
  console.log(result.rows);
  return result.rows;
}


async function comercial(context) {

  let query = baseQuery;
  const binds = {};
 
   if (context.fornecedorId) {
    binds.FORNECEDOR = context.fornecedorId;
    binds.CONTROLE = context.controleId;

    query = `select * from mgagr.agr_bi_visaocomercial_dq where COD_FORNECEDOR = :FORNECEDOR and CONTROLE = :CONTROLE`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
 
module.exports.find = find;
module.exports.comerciais = comerciais;
module.exports.comercial = comercial;