import React from 'react';
import getComponentByChunkType from './get-component-by-chunk-type.js';

export default function renderChunks(chunks) {
    return chunks.map( chunk => {
        const { id = ''} = chunk;
        const Component = getComponentByChunkType(chunk.component);
        if (!Component) {
            console.error(`No component was wound for '${chunk.component}'`);
            return false;
        }

        return React.createElement(
            Component,
            { key: id, ...chunk },
            null
        );
    });
}
