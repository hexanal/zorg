import React from 'react';

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
export default function chunkToComponent(chunk, props = {}, chunks = {}) {
    return Array.isArray(chunk)
        ? chunk.map(c => output(c, props, chunks))
        : output(chunk, props, chunks);
}

function output(chunk, props = {}, chunks) {
    const found = chunks[chunk.type];
    if (!found) {
        console.error(`no chunk found of type: '${chunk.type}'`); // couldn't find an associated chunks
        return React.createElement( 'div', null, 'error!');
    }

    // @todo clean this up, make it easier to understand that whole context business
    const { context: propsContext = null } = chunk;
    const { context: contextOverride = null } = props;
    const context = propsContext || contextOverride || 'view';
    const Component = found[context];
    if (!Component) {
        return console.error(`no component found for type '${chunk.type}', in '${context}' context.`);
    }

    if (!Component) {
        return React.createElement('div', null, 'error!');
    }

    return React.createElement(
        Component,
        { 
            key: chunk.id || '~~',
            ...chunk,
            ...props
        },
        null
    );
}