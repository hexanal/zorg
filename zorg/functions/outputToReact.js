import debug from '../lib/debug.js';
import htmlShell from '../../sites/kuuma/server/htmlShell.js';
import { write } from '../lib/files.js';

export default function outputToReact(item, config) {
  if (!item.type || !item.url) return item; // don't build if there is no attached component or URL
  if (item.type === 'api') return item; // @todo maybe not like that though?

  const { tasks = [] } = config;
  const { 
    host = null,
    port = null,
  } = tasks.find(t => t.type === 'serve') || {};

  const serverURL = host ? `http://${host}${port ? ':'+port:''}${item.url}` : null;
  const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML

  debug(`

## rendering chunk:

* title: '${item.title}'
* type: '${item.type}'
* url: '${item.url}'
* built in folder: '${destination}'
${serverURL ?
'* accessible at: ' + serverURL : ''}

`, 'functions/outputToReact');

  const html = htmlShell(item);
  write(destination, 'index.html', html, config);

  return item;
}
