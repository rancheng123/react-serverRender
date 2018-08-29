import React from 'react';
import { renderToString } from 'react-dom/server'
import {match,RouterContext} from 'react-router';
import routes from './routes';


function serverRender(req, res){

    debugger;
    debugger
    match({
        routes: routes,
        location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {

        debugger
        if (error) {
            return res.status(500).send(error.message);
        } else if (redirectLocation) {
            return res.redirect(302, encodeURI(redirectLocation.pathname + redirectLocation.search));
        } else if (renderProps && renderProps.components) {


            debugger;
            var fs = require('fs');
            var path = require('path');

            //创建文件
           /* fs.open('./abcd.js','w',function(error,fd){
                debugger;
                console.log(error);
                console.log(fd)
            })*/


            const rootComp = <RouterContext {...renderProps}/>

            //读取文件(异步)
            var data = fs.readFileSync('./frontEnd/qianjia/dist/index.html','utf-8');

            var newData = data.replace('{{content}}}',renderToString(rootComp))


            return res.status(200).send(newData);

            res.end()


        } else {
            res.status(404).send('Not found');
        }
    });
}


function renderFullPage(renderedContent) {
    return `<!doctype html>
  <html lang="">
    <head>
      <meta http-equiv="content-type" content="text/html;charset=utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">
      <meta name="renderer" content="webkit">
      <meta name="force-rendering" content="webkit">
      <title>Up</title>
      
    </head>
    <body>
      <div id="app">${renderedContent}</div>
     
    </body>
  </html>`;
}

module.exports = serverRender;






