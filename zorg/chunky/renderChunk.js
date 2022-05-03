import React from 'react';
import getComponentByChunkType from './getComponentByChunkType.js';

/**
 * takes a `chunks` object, and returns a React component that represents it
 * 
 * @param {chunkData} object the chunk data as `chunkData`, to match React's nomenclature
 * @returns a react element representing the chunk
 */
export default function renderChunk(chunkData, context = 'view', otherProps) {
    const {
        id = '', // @todo each chunk should have a unique id
        type = 'json', // default "fallback" type is json; it just logs its chunkData;
    } = chunkData;

    const Component = getComponentByChunkType(type, context);
    if (!Component) {
        return React.createElement(
            'div',
            null,
            'error!'
        );
    }

    return React.createElement(
        Component,
        { 
            key: id,
            context,
            ...chunkData,
            ...otherProps
        },
        null
    );
}
