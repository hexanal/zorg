import React from 'react';
import * as allChunks from './chunks.js'; // import all the chunks used by website
import error from '../app/log/error.js';

// this takes a `chunks` object and processes it to output a React component
export default function renderChunk(props) {
    const {
        id = '', // @todo each chunk should have a unique id
        context = 'view', // chunk can render different components depending on its current context
        type = 'json' // default "fallback" type is json; it just logs its props
    } = props;

    const chunk = allChunks[type];
    if (!chunk)
        return error(`no chunk found of type: '${type}'`); // couldn't find an associated chunks
    if (!chunk.context)
        return error(`chunk type '${type}' does not export a 'context' key.`); // chunk doesn't provide a `context` key

    const Component = chunk.context[context];
    if (!Component)
        return error(`no component found for type '${type}', in '${context}' context.`);

    return React.createElement(
        Component,
        { key: id, ...props },
        null
    );
}
