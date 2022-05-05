import React from 'react-dom';
import chunkToComponent from './chunkToComponent.js';

export default function createChunky(chunks) {
    return {
        // shortcuts for client-side
        chunkToComponent: (chunkData, props) => chunkToComponent(chunkData, props, chunks),
        el: React.createElement,
        chunks
    };
}
