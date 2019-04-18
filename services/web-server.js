const http = require('http');
const express =require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');
//const router =require('./router.js');
const database = require('./database.js');

let httpServer;

function initialize(){
    return new Promise((resolve, reject)=>{
        const app = express();
        httpServer = http.createServer(app);

        app.use(morgan('combined'));

       // app.get('/api',router);
        app.get('/', async (req, res) => {
            const result = await database.simpleExecute(`select  f.FAGR_IN_CODIGO AS COD_FORNECEDOR,
            f.FAGR_ST_NOME AS FORNECEDOR
            from mgagr.AGR_FAGRICOLA f ORDER BY FORNECEDOR ASC`);
            //const user = result.rows[0].USER;
            //const date = result.rows[0].SYSTIMESTAMP;
            const total = result.rows;
       
            res.end(`resultado: ${total}`);
          });

        httpServer.listen(webServerConfig.port)
        .on('listening',()=>{
            console.log(`Web Server Ouvindo Localhost ${webServerConfig.port}`);
            resolve();
        })
        .on('error', err =>{
            reject(err);
        });
    });
}

function close(){
    return new Promise((resolve, reject)=>{
        httpServer.close((err)=>{
            if(err){
                reject(err);
                return;
            };
            resolve();
        });
    });
}

module.exports.close = close;
module.exports.initialize = initialize;