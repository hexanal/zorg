import * as ReactDOM from 'react-dom';
import renderChunk from './app/chunky/renderChunk.js';

const container = document.getElementById('kuuma');
const Root = renderChunk(__ITEM__);

ReactDOM.hydrate(Root, container);
