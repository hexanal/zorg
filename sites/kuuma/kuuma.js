import ReactDOM from 'react-dom';
import { chunkToComponent } from './kuuma.chunky.js';

ReactDOM.hydrate(
    chunkToComponent(__CHUNK__), // hydrate the root chunk with data passed to frontend from Chunky
    document.getElementById('root')
); 
