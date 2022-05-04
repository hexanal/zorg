import React from 'react';
import getComponentByChunkForSite from './getComponentByChunkForSite.js';
import fallbackChunk from './fallbackChunk.js';

/**
 * takes a `chunks` object, and returns a React component that represents it
 * @todo document
 * 
 * @param {chunkData} object the chunk data as `chunkData`, to match React's nomenclature
 * @returns a react element representing the chunk
 */
// @critical
// @todo otherProps is there to be able to propagate events and stuff, but
// I need to eventually just stick everything in the props/chunk data
// so there...
// @todo the array/single chunk thing... not CLEAR!!!
export default function outputChunkToComponent(chunk, extraProps = {}, library = {}) {
    return Array.isArray(chunk)
        ? chunk.map(c => output(c, extraProps, library))
        : output(chunk, extraProps, library);
}

function output(chunk, extraProps = {}, library) {
    const ChunkComponent = getComponentByChunkForSite(chunk, extraProps, library) || fallbackChunk;

    console.log( ChunkComponent );

    if (!ChunkComponent) {
        return React.createElement('div', null, 'error!');
    }

    return React.createElement(
        ChunkComponent,
        { 
            key: chunk.id || '~~',
            ...chunk,
            ...extraProps
        },
        null
    );
}