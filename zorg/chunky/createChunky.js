import outputChunkToComponent from './outputChunkToComponent.js';

export default function createChunky(library) {
    return (chunkData, extraProps) => outputChunkToComponent(chunkData, extraProps, library);
}