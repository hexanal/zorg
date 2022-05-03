import React from 'react';
import getComponentByChunkType from './getComponentByChunkType.js';

/**
 * takes a `chunks` object, and returns a React component that represents it
 * 
 * @param {chunkData} object the chunk data as `chunkData`, to match React's nomenclature
 * @returns a react element representing the chunk
 */
// @critical
// @todo otherProps is there to be able to propagate events and stuff, but
// I need to eventually just stick everything in the props/chunk data
// so there...
export default function renderChunk(chunk, context = 'view', otherProps, site = null) {
    return Array.isArray(chunk)
        ? chunk.map(c => render(c, context, otherProps, site))
        : render(chunk, context, otherProps, site)
}

function render(chunkData, context = 'view', otherProps, site){
    const {
        id = '', // @todo each chunk should have a unique id
        type = 'json', // default "fallback" type is json; it just logs its chunkData;
    } = chunkData;

    const chunkComponent = getComponentByChunkType(type, context, site);
    
    if (!chunkComponent) {
        return React.createElement(
            'div',
            null,
            'error!'
        );
    }

    return React.createElement(
        chunkComponent,
        { 
            key: id,
            context,
            ...chunkData,
            ...otherProps
        },
        null
    );
}
