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
    console.log(context.id);
    binds.CONTROLE = context.id;
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
 
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
    console.log(context.id);
    binds.CONTROLE = context.id;
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
 
    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO as ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga','U','Uva','C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE as CONTROLE, vp.SAFRA, sum(vp.PESO) as VOLUME_KG                                                                                                                  
      from mgagr.agr_bi_visaoprodutivaph_dq vp
      where vp.PROCESSO = 1 AND vp.CONTROLE = :CONTROLE AND vp.ANO = :ANO AND vp.CULTURA = :CULTURA
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


module.exports.find = find;
module.exports.importa = importa;