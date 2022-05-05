import chunkToComponent from './chunkToComponent.js';

export default function chunky(chunks) {
    return {
        // shortcut for client-side (not having to pass the chunks library every time)
        chunkToComponent: (chunkData, props) => chunkToComponent(chunkData, props, chunks),
        // @todo in case we want to grab chunks from there as well?
        chunks
    };
}
