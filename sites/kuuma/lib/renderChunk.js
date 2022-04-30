import React from 'react';
import getComponentByChunkType from './getComponentByChunkType.js';

/**
 * takes a `chunks` object, and returns a React component that represents it
 * 
 * @param {chunkData} object the chunk data as `chunkData`, to match React's nomenclature
 * @returns a react element representing the chunk
 */
export default function renderChunk(chunkData, context = 'view') {
    const {
        id = '', // @todo each chunk should have a unique id
        // context = 'view', // chunk can render different components depending on its current context
        type = 'json' // default "fallback" type is json; it just logs its chunkData
    } = chunkData;

    const component = getComponentByChunkType(type);

    if (!component) return;
    if (!component.context) {
        console.error(`component type '${type}' does not export a 'context' key.`); // chunk doesn't provide a `context` key
        return;
    }

    const Component = component.context[context];
    if (!Component) {
        console.error(`no component found for type '${type}', in '${context}' context.`);
        return;
    }

    return React.createElement(
        Component,
        { key: id, ...chunkData },
        null
    );
}
