import React from 'react';
import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import renderChunk from '../../../../zorg/chunky/renderChunk.js';

export default createChunk('element-box', {
    view: Box,
    edit: BoxEditor
})

export function Box(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'box' }, renderChunk(body));
}

export function BoxEditor(props) {
    const { body = [], onChunkChange: onChange = null } = props || {};

    function onChunkChange(value) {
        if (!onChange) return;

        onChange(value); // pass it up! @todo STATE MANAGEMENT!!!!
        console.log({ boxy: true, value });
    }

    return React.createElement(
        'div',
        { className: 'box-edit', style: {border: '2px solid black', padding: '1rem'} },
        [
            'editing!',
            React.createElement(
                'div',
                { style: {border: '2px solid black', padding: '1rem'} },
                renderChunk(body, 'edit', { onChunkChange })
            )
        ]
    );
}
