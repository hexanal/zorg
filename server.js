import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import lusca from 'lusca';
import morgan from 'morgan';
import zorg from './zorg/zorg.js';
import log from './zorg/lib/log.js';
import config from './src/kuuma/app/config.js';

dotenv.config();

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 8020);
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  res.set('Permissions-Policy', 'interest-cohort=()'); // floc off!
  res.removeHeader('X-Powered-By'); // kind of useless?
  next();
});

// @todo try to loop through websites' configs and serve
// @todo try to make the server-launching, part of zorg's job rather that the other way around?
// let's go
// app.use('/', express.static(path.join(path.dirname('public') )) );
app.use('/', express.static('./public') );

app.use(function(req, res) {
  res.status(404);
  // `${config.root}/...`
  res.send( fs.readFileSync('./public/404/index.html', 'utf8') );
});
app.use(function(req, res) {
  res.status(500);
  res.send( fs.readFileSync('./public/500/index.html', 'utf8') );
})

app.listen(app.get('port'), () => {
  zorg.run(config);

  if (app.get('env') === 'development') {
    zorg.watch(config);
  }

  log(`env: ${app.get('env')}`, { critical: true });
  log(`url: http://${app.get('host')}:${app.get('port')}`, { critical: true });
});
