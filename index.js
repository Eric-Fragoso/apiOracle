const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startup(){
    console.log('aplicação iniciada');

    try {
        console.log('Initializando modulo do OracleDB');        
        await database.initialize(); 
    } catch (err) {
        console.error(err);        
        process.exit(1); 
    }

    try{
        console.log('Initializando modulo do servidor web');
        await webServer.initialize();
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

async function shutdown(e){
    let err = e;

    console.log('Desligar');

    try{
        console.log('Fechando o servidor WEB');

        await webServer.close();
    }catch(e){
        console.log('Foi encontrado um erro', e);
        err = err || e;
    }

    console.log('Processo existente');
    if(err){
        process.exit(1);
    }else{
        process.exit(0);
    }

    try {
        console.log('Fechando Banco de Dados');
     
        await database.close(); 
      } catch (err) {
        console.log('Erro Econtrado', e);
     
        err = err || e;
      }
}

process.on('SIGTERM', ()=>{
    console.log('Recebendo SIGTERM');

    shutdown();
});

process.on('SIGINT', ()=>{
    console.log('Recebendo SIGINT');

    shutdown();
});


process.on('uncaughtException', err=>{
    console.log('uncaught exception');
    console.error(err);

    shutdown(err);
});


startup();