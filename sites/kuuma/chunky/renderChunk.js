import React from 'react';
import getChunkByType from './getChunkByType.js';
import error from '../app/log/error.js';

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

    const chunk = getChunkByType(type);

    if (!chunk) return;
    if (!chunk.context)
        return error(`chunk type '${type}' does not export a 'context' key.`); // chunk doesn't provide a `context` key

    const Component = chunk.context[context];
    if (!Component)
        return error(`no component found for type '${type}', in '${context}' context.`);

    return React.createElement(
        Component,
        { key: id, ...chunkData }, // @todo passing context along...?
        null
    );
}
