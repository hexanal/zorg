import * as ReactDOM from 'react-dom'; // using React!
import library from './chunks/chunks.js';
import outputChunkToComponent from '../../zorg/chunky/outputChunkToComponent.js';

export const config = {
    id: 'kuuma', // must match the folder!
    name: 'kuumakesa.com/', // a name to identify this website
    title: 'Kuuma Kesä', // the default "title" for the website (i.e. tab time in browser, SEO title, etc.)
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.", // meta description
    library
};

// @todo
export function createChunk(chunkData, extraProps = {}) {
    return outputChunkToComponent(chunkData, config, extraProps);
}

// export function createChunk(chunkData, extraProps = {}) {
//     return outputChunkToComponent(chunkData, config, { ...extraProps, context: 'edit' });
// }

export function hydrateClient() {
    const container = document.getElementById('root');
    const Root = createChunk(__CHUNK__);

    // @todo/doc this page was already built from the server, so we simply "hydrate" with the props in the __CHUNK_ global variable.
    ReactDOM.hydrate(Root, container); 
}
