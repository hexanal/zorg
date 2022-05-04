import chunkToComponent from './chunkToComponent.js';

export default function chunky(chunks) {
    return {
        // shortcuts for client-side
        chunkToComponent: (chunkData, props) => chunkToComponent(chunkData, props, chunks),
        chunks
    };
}
