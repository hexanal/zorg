import ReactDOM from 'react-dom';
import { createChunk } from './kuuma.chunky.js';

const Root = createChunk(__CHUNK__); // @todo shall I export this one?!

ReactDOM.hydrate(Root, document.getElementById('root')); 
