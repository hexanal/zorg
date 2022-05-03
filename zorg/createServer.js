import compression from 'compression';
import express from 'express';
import fs from 'fs';
import lusca from 'lusca';
// import morgan from 'morgan';
import log from './log/log.js';
import todo from './log/todo.js';
import * as endpoints from './endpoints/index.js';

const { argv = null } = process || {};

export default function createServer(site) {
  const {
    baseUrl = '/',
    root = './public',
    name = '[a website has no name...]',
    env = 'dev',
    host = 'localhost',
    port = 8080,
  } = site || {};
  const app = express();

  // express config here
  app.set('host', host);
  app.set('port', port);
  app.use(compression());
  app.use(express.json());
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  if (argv.includes('--server-logs')) {
    app.use(morgan('tiny'));
  }

  // modify headers here
  app.use((req, res, next) => {
    res.set('Permissions-Policy', 'interest-cohort=()'); // floc off!
    res.removeHeader('X-Powered-By'); // kind of useless?
    next();
  });

  // static site root/base
  // could be dynamic? 
  app.use(baseUrl, express.static(root) );

  todo(`i think it's important to make this more obvious somehow...`);
  Object.values(endpoints).map(endpoint => {
    endpoint(site, app);
  });

  // errors
  app.use(function(req, res) {
    res.status(404);
    res.send( fs.readFileSync(`${root}/404/index.html`, 'utf8') );
  });
  app.use(function(req, res) {
    res.status(500);
    res.send( fs.readFileSync(`${root}/500/index.html`, 'utf8') );
  })

  app.listen(port, () => {
    log(`

# running server (express)

* serving: ${name}
* env: ${env}
* url: http://${host}:${port}

`);
  });

  return app;
}
