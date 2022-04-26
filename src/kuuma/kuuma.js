import * as ReactDOM from 'react-dom';
import renderChunks from './base/render-chunks.js';

const container = document.getElementById('kuuma');
const Root = renderChunks([__ITEM__]);

ReactDOM.hydrate(Root, container);
