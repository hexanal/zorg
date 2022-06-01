import React from 'react';
import { toComponent } from 'chunky';

export default {
    type: 'element-box',
    view: Box,
    edit: BoxEditor,
};

export function Box(props) {
    const { chunks = [] } = props || {};

    return React.createElement('div', { className: 'box' }, toComponent(chunks));
}

export function BoxEditor(props) {
    const { chunks = [], onChunkChange = null } = props || {};

    return React.createElement(
        'div',
        { className: 'box-edit', style: {border: '2px solid black', padding: '1rem'} },
        [
            'editing!',
            React.createElement(
                'div',
                { style: {border: '2px solid black', padding: '1rem'} },
                toComponent(chunks, {
                    context: 'edit',
                    onChunkChange
                })
            )
        ]
    );
}
