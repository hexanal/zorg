import compression from 'compression';
import express from 'express';
import fs from 'fs';
import lusca from 'lusca';
// import morgan from 'morgan';
import * as endpoints from '../endpoints/index.js';

const { argv = null } = process || {};

export default function serve(options, site) {
  const {
    name = '[a website has no name...]',
  } = site || {};
  const {
    baseUrl = '/',
    root = './public',
    env = 'dev',
    host = 'localhost',
    port = 8080,
  } = options || {};
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

  Object.values(endpoints).map(endpoint => {
    endpoint(app, options);
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

console.log(`

# running server

* site: ${name}
* env: ${env}
* url: http://${host}:${port}

`);
  });

  return app;
}
