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
    binds.FORNECEDOR = context.id;
 
    query += `\n where COD_FORNECEDOR = :FORNECEDOR`;
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

async function comercialControle(context) {

  let query = baseQuery;
  const binds = {};
 
   if (context.controleId) {
    binds.CONTROLE = context.controleId;

    query = `select        
    vc.TIPO_LANCAMENTO,
    vc.CONTROLE,
    vc.MERCADO,
    vc.NOTA_FISCAL,
    vc.CONTAINER,              
    vc.DATA_EMBARQUE,
    decode(upper(substr(vc.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra') as CULTURA,
    vc.VARIEDADE,
    vc.CAIXA,
    vc.VLPERC_COMISSAO,
    vc.COMISSAO_IBACEM,
    VC.MOEDA,
    VC.CAMBIO,
    sum(vc.VALOR_BRUTO_CX) as VALOR_BRUTO_CX,             
    sum(vc.OUTRAS_DESP_CX) as OUTRAS_DESP_CX,              
    sum(VC.DESP_FRETE_CX) as DESP_FRETE_CX,
    sum(vc.CUSTO_PH) as CUSTO_PH,
    sum(vc.QTD_CAIXA) as QTD_CAIXA,
    sum(vc.PESO_CX) as KG
    from mgagr.agr_bi_visaocomercial_dq vc where vc.CONTROLE = :CONTROLE

    group by
    vc.TIPO_LANCAMENTO,
    vc.CONTROLE,
    vc.MERCADO,
    vc.NOTA_FISCAL,
    vc.CONTAINER,              
    vc.DATA_EMBARQUE,
    decode(upper(substr(vc.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
    vc.VARIEDADE,
    vc.CAIXA,
    vc.VLPERC_COMISSAO,
    vc.COMISSAO_IBACEM,
    VC.MOEDA,
    VC.CAMBIO`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
 
module.exports.find = find;
module.exports.comerciais = comerciais;
module.exports.comercial = comercial;
module.exports.comercialControle = comercialControle;