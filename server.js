import compression from 'compression';
import express from 'express';
import fs from 'fs';
import lusca from 'lusca';
import morgan from 'morgan';
import zorg from './zorg/zorg.js';
import log from './zorg/lib/log.js';
import SITES from './sites.js';

function serveSite(site) {
  const {
    HOST = 'localhost',
    PORT = 8080,
    ENV = 'dev',
    baseUrl = '/',
    root = './public',
    name = '[a website has no name...]'
  } = site || {};

  const app = express();

  // express config here
  app.set('host', HOST);
  app.set('port', PORT);
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
  app.use(baseUrl, express.static(root) );

  // errors
  app.use(function(req, res) {
    res.status(404);
    res.send( fs.readFileSync(`${root}/404/index.html`, 'utf8') );
  });
  app.use(function(req, res) {
    res.status(500);
    res.send( fs.readFileSync(`${root}/500/index.html`, 'utf8') );
  })

  return app.listen(PORT, () => {
    zorg.run(site);

    if (ENV === 'env') {
      zorg.watch(site);
    }

    log(`serving: ${name}`);
    log(`env: ${ENV}`);
    log(`url: http://${HOST}:${PORT}`);
  });
}

const zorged = SITES.map( site => {
  return serveSite(site);
});
