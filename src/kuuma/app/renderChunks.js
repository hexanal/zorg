import React from 'react';
import * as allChunks from '../chunks/index.js';

export function renderChunk(props) {
    const { id = '', context = 'view', type = 'json' } = props;
    const chunk = allChunks[type];
    if (!chunk || !chunk.contexts) {
        console.error(`No chunk found of type: '${type}'`);
        return false;
    }
    const Component = chunk.contexts[context];

    if (!Component) {
        console.error(`No component found for type '${type}', in '${context}' context.`);
        return false;
    }

    return React.createElement(
        Component,
        { key: id, ...props },
        null
    );
}

// @todo `chunkRender(chunks = [], context = 'view')` 
export default function renderChunks(chunks) {
    return Array.isArray(chunks)
        ? chunks.map(renderChunk)
        : renderChunk(chunks)
}
