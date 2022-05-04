import { createElement } from 'react';

/**
 * takes a type of chunk as string and returns the chunk's object
 * @todo better error messages, fallbacks, etc.
 * 
 * @param {type} string
 * @returns the found `chunk` object
 */
export default function getComponentByChunkForSite(chunk, extraProps, library = {}) {
    const found = library[chunk.type];
    if (!found) {
        console.error(`no chunk found of type: '${chunk.type}'`); // couldn't find an associated chunks
        return createElement( 'div', null, 'error!');
    }
    if (!found.context) {
        console.error(`component type '${chunk.type}' does not export a 'context' key!`); // chunk doesn't provide a `context` key
        return createElement( 'div', null, 'error!');
    }

    // @todo clean this up, make it easier to understand that whole context business
    const { context: propsContext = null } = chunk;
    const { context: contextOverride = null } = extraProps;
    const context = propsContext || contextOverride || 'view';
    const Component = found.context[context];
    if (!Component) {
        return console.error(`no component found for type '${chunk.type}', in '${chunk.context}' context.`);
    }

    return Component;
}
