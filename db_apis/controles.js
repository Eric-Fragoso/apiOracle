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
  return result.rows;
}


async function exibesel(context) {
  
  let query = baseQuery;
  const binds = {};
 
  console.log(context);
   if (context.id) {
    binds.CONTROLE = context.id;
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO, vp.MES, to_number(to_char(to_date(vp.DATA,'DD/MM/YYYY'),'WW')) as SEMANA,
    vp.DATA,decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                     ,'U','Uva'
                                     ,'C','Cacau','Outra') as CULTURA,
    vp.VARIEDADE, vp.CONTROLE, vp.MERCADO, vp.CALIBRE,
    sum(case when (vp.PROCESSO = 2 and vp.MERCADO like 'M.I%' )then vp.PESO 
             else 0 end)as VOLUME_KG_MI,
    sum(case when (vp.PROCESSO = 2 and vp.MERCADO not like 'M.I%' )then vp.PESO 
             else 0 end)as VOLUME_KG_ME,
    sum(case when (vp.PROCESSO = 4 and upper(vp.MERCADO)  like '%REFUGO%' ) then vp.PESO 
             else 0 end) as VOLUME_KG_REFUGO         
                                                                                                                      

    from mgagr.agr_bi_visaoprodutivaph_dq vp
    where vp.PROCESSO in (2,4) AND vp.CONTROLE = :CONTROLE AND vp.ANO = :ANO AND vp.SAFRA = :CULTURA
	AND (
		( vp.PROCESSO = 2 and
                 upper(vp.MERCADO) not like '%REFUGO%'
	        )
                OR
		( vp.PROCESSO = 4 and
		  upper(vp.MERCADO) like '%REFUGO%' and
		  upper(vp.MERCADO) like '%SELE%' 		
		)
	   )	 
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
        vp.MERCADO,
        vp.CALIBRE,
        vp.CONTROLE`; 
        
      
  }

  const result = await database.simpleExecute(query, binds);
  console.log(result);
  return result.rows;
}

async function exibeemb(context) {
  
  let query = baseQuery;
  const binds = {};
 
   if (context.id) {
    binds.CONTROLE = context.id;
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
    query = `\n select vp.COD_FORNECEDOR as COD_FORNECEDOR, vp.ANO,

    decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra') as CULTURA  ,
      vp.VARIEDADE, vp.CONTROLE, vp.MERCADO,
      sum(vp.PESO) as VOLUME
                                                                                                                        
  from mgagr.agr_bi_visaoprodutivaph_dq vp
  where vp.CONTROLE = :CONTROLE AND vp.SAFRA = :CULTURA AND  vp.ANO = :ANO
        and(
            (vp.PROCESSO = 4 and upper(vp.MERCADO) like '%LINHA%') or
            (vp.PROCESSO = 3)
           )
  group by
      vp.COD_FORNECEDOR,
      vp.ANO,
      decode(upper(substr(vp.SAFRA,1,1)),'M','Manga'
                                      ,'U','Uva'
                                      ,'C','Cacau','Outra'),
      vp.VARIEDADE,
      vp.MERCADO,
      vp.CONTROLE
          `; 
        
      
  }
  
  const result = await database.simpleExecute(query, binds);
  console.log(result);
  return result.rows;
}

async function exibeexp(context) {
  
  let query = baseQuery;
  const binds = {};
 
  console.log(context);
   if (context.id) {
    binds.CONTROLE = parseInt(context.id);
   
    binds.ANO = context.ano;
    binds.CULTURA = context.cultura;
    console.log(binds.CONTROLE, binds.ANO, binds.CULTURA);
    query = `\n select vc.CONTROLE,
    vc.MERCADO,
    vc.CONTAINER,
    vc.COD_FORNECEDOR as COD_FORNECEDOR,
    vc.DATA_EMBARQUE,
    decode(upper(substr(vc.SAFRA,1,1)),'M','Manga'
                                    ,'U','Uva'
                                    ,'C','Cacau','Outra') as CULTURA,
    vc.VARIEDADE,
    sum(vc.QTD_CAIXA) as QTD_CAIXA,
    sum(vc.PESO_CX) as KG
from mgagr.agr_bi_visaocomercial_dq vc where vc.CONTROLE = :CONTROLE AND CULTURA = :CULTURA
group by
    vc.CONTROLE,
    vc.MERCADO,
    vc.COD_FORNECEDOR,
    vc.CONTAINER,
    vc.DATA_EMBARQUE,
    decode(upper(substr(vc.SAFRA,1,1)),'M','Manga'
                                    ,'U','Uva'
                                    ,'C','Cacau','Outra'),
    vc.VARIEDADE
          `; 
        
      
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

    query = `\n select *
    from (
          select  
                'RECEPÇÃO' as ETAPA,
                vp.CONTROLE as CONTROLE, 
                vp.SAFRA, 
                sum(vp.PESO) as PESO                                                                                                                  
                
                from mgcli.cli_dw_visaoprodutivaph_dq vp
                where vp.PROCESSO = 1 and vp.CONTROLE = :CONTROLE and vp.SAFRA = :SAFRA
                group by
                vp.CONTROLE,
                vp.SAFRA
                
          UNION ALL
    
          select 'SELEÇÃO' as ETAPA, 
                 vp.CONTROLE, 
                 vp.SAFRA,
                 sum(vp.peso) as PESO
                                                                                                                                
    
              from mgcli.cli_dw_visaoprodutivaph_dq vp
            where vp.PROCESSO in (2,4) and vp.CONTROLE = :CONTROLE and vp.SAFRA = :SAFRA
            AND (
              ( vp.PROCESSO = 2 and
                           upper(vp.MERCADO) not like '%REFUGO%'
                    )
                          OR
              ( vp.PROCESSO = 4 and
                upper(vp.MERCADO) like '%REFUGO%' and
                upper(vp.MERCADO) like '%SELE%'     
              )
               )   
              group by
                  vp.CONTROLE,
                  vp.SAFRA
    
    
    
          UNION ALL
    
          select 
                'EMBALAGEM' as ETAPA, 
                        vp.CONTROLE,               
                        vp.SAFRA,
                        sum(vp.PESO) as PESO
                                                                                                                                          
                    from mgcli.cli_dw_visaoprodutivaph_dq vp
                    where (
                              (vp.PROCESSO = 4 and upper(vp.MERCADO) like '%LINHA%') or
                              (vp.PROCESSO = 3)
                             ) and vp.CONTROLE = :CONTROLE and vp.SAFRA = :SAFRA
                    group by
                        vp.CONTROLE,
                        vp.SAFRA
    
    
          UNION ALL
    
          select 
                   'EXEPDIÇÃO' as ETAPA,
                        vc.CONTROLE,
                        vc.SAFRA,
                        sum(vc.PESO_CX) as PESO
                    from mgagr.agr_bi_visaocomercial_dq vc where vc.CONTROLE = :CONTROLE and vc.SAFRA = :SAFRA
                    group by
                        vc.CONTROLE,
                        vc.SAFRA
    )`;   
  }

  const result = await database.simpleExecute(query, binds);
 
  console.log(result);
  return result.rows;
}

module.exports.visualprodutor = visualprodutor;
module.exports.find = find;
module.exports.importa = importa;
module.exports.exibesel = exibesel;
module.exports.exibeemb = exibeemb;
module.exports.exibeexp = exibeexp;
module.exports.fornecedor = fornecedor;
module.exports.acompanhamentoControle = acompanhamentoControle;