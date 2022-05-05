import React from 'react';
import { chunkToComponent } from '../../../kuuma.chunky.js';

export default {
    view: Box,
    edit: BoxEditor
};

export function Box(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'box' }, chunkToComponent(body));
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
                chunkToComponent(body, {
                    context: 'edit',
                    onChunkChange
                })
            )
        ]
    );
}
