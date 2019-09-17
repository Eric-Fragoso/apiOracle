const database = require('../services/database.js');
 
const baseQuery = 
  `select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
  f.FAGR_ST_NOME AS FORNECEDOR
  from mgagr.AGR_FAGRICOLA f order by FORNECEDOR`;
  
async function find(context) {
  
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.FORNECEDOR = context.id;
 
    query += `\n where COD_FORNECEDOR = :FORNECEDOR`;
  }
  
  const result = await database.simpleExecute(query, binds);
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
    binds.FORNECEDOR = context.fornecedorId;

    query = `select d.TIPO_LANCAMENTO,
    d.SAFRA,
    d.CONTROLE,
    d.ORIGEM_FRUTA,
    d.COD_FORNECEDOR,
    d.COD_FORNECEDOR_AGN,
    d.FORNECEDOR,
    d.TALHAO,
    d.CULTURA,
    d.COD_VARIEDADE,
    d.VARIEDADE,
    d.CALIBRE,
    d.CAIXA,
    sum(d.QTD_CAIXA) as QTD_CAIXA,
    sum(d.PESO_CX) as PESO_CX,
    d.TIPO_CX,
    sum(d.VOLUME) as VOLUME,
    sum(d.QTDT_CX_RESULT) as QTDT_CX_RESULT,
    sum(d.VALOR_BRUTO_CX) as VALOR_BRUTO_CX,
    sum(d.OUTRAS_DESP_CX) as OUTRAS_DESP_CX,
    sum(d.VALOR_COMISSAOIMP_CX) as VALOR_COMISSAOIMP_CX,
    sum(d.RESU_BRUTO) as RESU_BRUTO,
    sum(d.VLPERC_COMISSAO) as VLPERC_COMISSAO,
    sum(d.COMISSAO_IBACEM) as COMISSAO_IBACEM,
    sum(d.RESU_FOB) as RESU_FOB,
    d.MOEDA,
    d.CAMBIO,
    sum(d.RESU_FOB_BR) as RESU_FOB_BR,
    sum(d.DESP_FRETE_CX) as DESP_FRETE_CX,
    sum(d.DESC_COMERCIAL) as DESC_COMERCIAL,
    d.VLPERC_COMISSAO_REP,
    sum(d.COMISSAO_REP) as COMISSAO_REP,
    sum(d.CUSTO_PH) as CUSTO_PH,
    sum(d.FRETE_COLHEITA) as FRETE_COLHEITA,
    sum(d.FUNRURAL) as FUNRURAL,
    sum(d.NET_CX) as NET_CX,
    sum(d.NET_KG) as NET_KG,
    sum(d.RESU_LIQ_BR) as RESU_LIQ_BR,
    sum(d.ADT_CX_ENTRES) as ADT_CX_ENTRES,
    sum(d.ADT_CX_ETOTAL) as ADT_CX_ETOTAL,
    sum(d.ADT_CX_SAIDA) as ADT_CX_SAIDA,
    sum(d.ADT_CX_STOTAL) as ADT_CX_STOTAL,
    d.CARREGAMENTO,
    d.CONTAINER,
    d.LACRE,
    d.NAVIO,
    d.NOTA_FISCAL,
    d.MODALIDADE,
    d.DATA_EMBARQUE,
    d.LOCAL_EMBARQUE,
    d.DATA_CHEGADA,
    d.LOCAL_DESEMBARQUE,
    d.MES_EMBARQUE,
    d.COD_CLIENTE,
    d.CLIENTE,
    d.COD_MERCADO,
    d.MERCADO,
    d.PAIS_SIGLA,
    d.PAIS
from mgagr.agr_bi_visaocomercial_dq d where COD_FORNECEDOR = :FORNECEDOR and CONTROLE = :CONTROLE
group by
d.TIPO_LANCAMENTO,
    d.SAFRA,
    d.CONTROLE,
    d.ORIGEM_FRUTA,
    d.COD_FORNECEDOR,
    d.COD_FORNECEDOR_AGN,
    d.FORNECEDOR,
    d.TALHAO,
    d.CULTURA,
    d.COD_VARIEDADE,
    d.VARIEDADE,
    d.CALIBRE,
    d.CAIXA,
    d.TIPO_CX,
    d.MOEDA,
    d.CAMBIO,
    d.VLPERC_COMISSAO_REP,
    d.CARREGAMENTO,
    d.CONTAINER,
    d.LACRE,
    d.NAVIO,
    d.NOTA_FISCAL,
    d.MODALIDADE,
    d.DATA_EMBARQUE,
    d.LOCAL_EMBARQUE,
    d.DATA_CHEGADA,
    d.LOCAL_DESEMBARQUE,
    d.MES_EMBARQUE,
    d.COD_CLIENTE,
    d.CLIENTE,
    d.COD_MERCADO,
    d.MERCADO,
    d.PAIS_SIGLA,
    d.PAIS
    `;
  }

  
  const result = await database.simpleExecute(query, binds);
  console.log(result);
  return result.rows;
}
 
module.exports.find = find;
module.exports.comerciais = comerciais;
module.exports.comercial = comercial;
module.exports.comercialControle = comercialControle;