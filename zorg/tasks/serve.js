import compression from 'compression';
import express from 'express';
import fs from 'fs';
import lusca from 'lusca';
import morgan from 'morgan';
import log from '../lib/log.js';
import { buildApiRoutes } from '../lib/server.js';

export default function serve(options, site) {
  const {
    baseUrl = '/',
    root = './public',
    name = '[a website has no name...]',
    env = 'dev',
  } = site || {};
  const {
    host = 'localhost',
    port = 8080,
  } = options || {};
  const app = express();

  // express config here
  app.set('host', host);
  app.set('port', port);
  app.use(compression());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));

  // modify headers here
  app.use((req, res, next) => {
    res.set('Permissions-Policy', 'interest-cohort=()'); // floc off!
    res.removeHeader('X-Powered-By'); // kind of useless?
    next();
  });

  // static site root/base
  // could be dynamic? 
  app.use(baseUrl, express.static(root) );

  buildApiRoutes(site, app);

  // errors
  app.use(function(req, res) {
    res.status(404);
    res.send( fs.readFileSync(`${root}/404/index.html`, 'utf8') );
  });
  app.use(function(req, res) {
    res.status(500);
    res.send( fs.readFileSync(`${root}/500/index.html`, 'utf8') );
  })

  return app.listen(port, () => {
    log(`serving: ${name}`);
    log(`env: ${env}`);
    log(`url: http://${host}:${port}`);
  });
}
