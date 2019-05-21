const database = require('../services/database.js');
 
const baseQuery = 
  `select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
  vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
  vp.VARIEDADE, vp.CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG                                                                                                                  
    from mgagr.agr_bi_visaoprodutivaph_dq vp
    where vp.PROCESSO = 1
    group by
    vp.COD_FORNECEDOR,
    vp.ANO,
    vp.MES,
    to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')),
    vp.DATA,
    decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                    ,'U','Uva'
                                    ,'C','Cacau','Outra'),
    vp.VARIEDADE,
    vp.CONTROLE,
    vp.SAFRA
    order by vp.DATA`;
  
async function find(context) {
  
  let query = baseQuery;
  const binds = {};
 
  
  if (context.id) {
    binds.CONTROLE = context.id;
 
    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO as ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE as CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG                                                                                                                  
      from mgagr.agr_bi_visaoprodutivaph_dq vp
      where vp.PROCESSO = 1 AND vp.CONTROLE = :CONTROLE
      group by
      vp.COD_FORNECEDOR,
      vp.ANO,
      vp.MES,
      to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')),
      vp.DATA,
      decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
      vp.VARIEDADE,
      vp.CONTROLE,
      vp.SAFRA
      order by vp.DATA`;
  }

  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
async function importa(context) {
  
  let query = baseQuery;
  const binds = {};
 
   if (context.id) {
    binds.CONTROLE = context.id;
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
    //console.log(binds);  

    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO as ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE as CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG                                                                                                                  
      from mgagr.agr_bi_visaoprodutivaph_dq vp
      where vp.PROCESSO = 1 AND vp.CONTROLE = :CONTROLE AND vp.ANO = :ANO AND vp.SAFRA = :CULTURA 
      group by
      vp.COD_FORNECEDOR,
      vp.ANO,
      vp.MES,
      to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')),
      vp.DATA,
      decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
      vp.VARIEDADE,
      vp.CONTROLE,
      vp.SAFRA
      order by vp.DATA`;   
  }

  const result = await database.simpleExecute(query, binds);
  console.log(result);
  return result.rows;
}

async function fornecedor(context) {
  
  let query = baseQuery;
  const binds = {};
 
   if (context.id) {
    binds.FORNECEDOR = context.id;

    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO as ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE as CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG,  vp.PROCESSO                                                                                                                  
      from mgagr.agr_bi_visaoprodutivaph_dq vp
      where vp.COD_FORNECEDOR = :FORNECEDOR
      group by
      vp.COD_FORNECEDOR,
      vp.ANO,
      vp.MES,
      to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')),
      vp.DATA,
      decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
      vp.VARIEDADE,
      vp.CONTROLE,
      vp.SAFRA,
      vp.PROCESSO
      order by vp.DATA`;
  }



  const result = await database.simpleExecute(query, binds);
  return result.rows;
}


async function visualprodutor(context) {

  let query = baseQuery;
  const binds = {};
 
   if (context.fornecedorId) {
    binds.FORNECEDOR = context.fornecedorId;
    binds.CONTROLE = context.controleId;

    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO as ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE as CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG,  vp.PROCESSO                                                                                                                  
      from mgagr.agr_bi_visaoprodutivaph_dq vp
      where vp.COD_FORNECEDOR = :FORNECEDOR and vp.CONTROLE = :CONTROLE
      group by
      vp.COD_FORNECEDOR,
      vp.ANO,
      vp.MES,
      to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')),
      vp.DATA,
      decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
      vp.VARIEDADE,
      vp.CONTROLE,
      vp.SAFRA,
      vp.PROCESSO
      order by vp.DATA`;
  }

  const result = await database.simpleExecute(query, binds);
  return result.rows;
}


async function acompanhamentoControle(context) {
  
  let query = baseQuery;
  const binds = {};
 
   if (context.id) {
    binds.CONTROLE = context.id;
    binds.SAFRA = context.cultura;
    console.log(context.cultura, context.ano);

    query = `\n select d.SAFRA,
    d.CONTROLE,
    rc.CON_DT_COLHEITA as DATA_CONTROLE,
    round(sum(case when(d.COD_PROCESSO = 1) then d.PESO else 0 end),2) as RECEPCAO,
    round(sum(case when(d.COD_PROCESSO in (3.1,3.2)) then d.PESO else 0 end),2) as SELECAO,         
    round(sum(case when(d.COD_PROCESSO in (4.1,4.12,4.21,4.24)) then d.PESO else 0 end),2) as EMBALAMENTO,                  
    round(sum(case when(d.COD_PROCESSO = 6) then d.PESO else 0 end),2) EXPEDICAO            
    from mgagr.agr_vw_saldosph_dq d
    inner join mgagr.agr_vw_resumocontrole_dq rc
          on(rc.compa_in_nrocontrole = d.controle) and(rc.safra_st_codigo = :SAFRA)
    where d.COD_PROCESSO in (1, 3.1, 3.2, 4.1, 4.12, 4.21, 4.24, 6) and d.CONTROLE = :CONTROLE and d.SAFRA = :SAFRA
    group by
    d.SAFRA,
    d.CONTROLE,
    rc.CON_DT_COLHEITA`;   
  }

  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}

module.exports.visualprodutor = visualprodutor;
module.exports.find = find;
module.exports.importa = importa;
module.exports.fornecedor = fornecedor;
module.exports.acompanhamentoControle = acompanhamentoControle;