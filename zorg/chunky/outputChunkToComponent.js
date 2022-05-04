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
export default function outputChunkToComponent(chunk, site = null, extraProps = {}) {
    return Array.isArray(chunk)
        ? chunk.map(c => output(c, site, extraProps))
        : output(chunk, site, extraProps);
}

function output(chunk, site, extraProps = {}) {
    const ChunkComponent = getComponentByChunkForSite(chunk, site, extraProps) || fallbackChunk;

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