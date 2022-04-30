import * as ReactDOM from 'react-dom'; // using React!
import renderChunk from './lib/renderChunk.js'; // this function parses a `chunk` object and renders its associated React component

const container = document.getElementById('root');
const Root = renderChunk(__CHUNK__);

// this page was already built from the server, so we simply "hydrate" with the props in the __ITEM__ global variable.
// see: `./zorg/lib/getStaticHtmlFromChunk.js` for the structure of the HTML website "shell" (what surrounds the React root element)
ReactDOM.hydrate(Root, container); 
