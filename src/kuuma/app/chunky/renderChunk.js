import React from 'react';
import * as allChunks from '../../chunks/index.js';

export default function renderChunk(props) {
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
