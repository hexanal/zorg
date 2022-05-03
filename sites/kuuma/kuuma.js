import * as ReactDOM from 'react-dom'; // using React!
import renderChunk from '../../zorg/chunky/renderChunk.js';

const container = document.getElementById('root');
const Root = renderChunk(__CHUNK__);

// this page was already built from the server, so we simply "hydrate" with the props in the __ITEM__ global variable.
// see: `./zorg/chunky/getStaticHtmlFromChunk.js` for the structure of the HTML website "shell" (what surrounds the React root element)
ReactDOM.hydrate(Root, container); 
