import { createElement } from 'react';
// @critical @todo how to fetch those component... or does this function necessarily needs to sit in the frontend code?
import library from '../../sites/kuuma/chunky.library.js';

/**
 * takes a type of chunk as string and returns the chunk's object
 * 
 * @param {type} string
 * @returns the found `chunk` object
 */
// @todo export default function getChunkTypeComponentByContext(type = '', context = 'view') {
export default function getComponentByChunkType(type = '', context = 'view') {
    const found = library[type];
    if (!found) {
        console.error(`no chunk found of type: '${type}'`, 'getComponentByChunkType'); // couldn't find an associated chunks
        return createElement(
            'div',
            null,
            'error!'
        );
    }
    if (!found.context) {
        console.error(`component type '${type}' does not export a 'context' key!`, 'getComponentByChunkType'); // chunk doesn't provide a `context` key
        return createElement(
            'div',
            null,
            'error!'
        );
    }

    const Component = found.context[context];
    if (!Component) {
        console.error(`no component found for type '${type}', in '${context}' context.`, 'getComponentByChunkType');
        return createElement(
            'div',
            null,
            'error!'
        );
    }

    return Component;
}
