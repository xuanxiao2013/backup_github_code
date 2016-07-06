import express from 'express';
import path from 'path';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Router, RouterContext, match } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

//import promiseMiddleware from '../common/middlewares/PromiseMiddleware';
//import combinedReducers from '../common/reducers';
//import fetchComponentData from '../common/utils/fetchComponentData';
//import routes from '../common/routes/routing';
//const finalCreateStore = applyMiddleware(promiseMiddleware)( createStore );

let routes = {};

const app = express();

//app.use('/assets', express.static(path.join(__dirname, '../client/assets')))
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// server rendering
app.use((req, res, next) => {
    //const store = finalCreateStore(combinedReducers);
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error){
            //return res.status(500).send( error.message );
            return res.status(500).send('server error');
        }

        if (redirectLocation)
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

        if (renderProps == null) {
            //return res.status(404).send('Not found');
        }

        synchronize();
        function synchronize() {
            //const initView = renderToString((
            //    <Provider store={store}>
            //        <RouterContext {...renderProps} />
            //    </Provider>
            //));
            //let state = JSON.stringify(store.getState());
            var initView, state;
            let page = renderFullPage(initView, state)
            res.status(200).send(page)
        }
    })
});


function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html lang="utf-8">
    <head>
        <title>server render</title>
    </head>
    <body>
        <div class="container">server render! </div>
        <script src="/static/bundle.js"></script>
    </body>
    </html>
	`
}

// example of handling 404 pages
app.get('*', function (req, res) {
    res.status(404).send('Server.js > 404 - Page Not Found');
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
    //console.error("Error on request %s %s", req.method, req.url);
    console.error(err.stack);
    res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
    console.log('uncaughtException: ', evt);
})

app.listen(3000, function () {
    console.log('Listening on port 3000');
});


