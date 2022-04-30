import React from 'react';
import renderChunks from '../../lib/renderChunks.js';

export default {
    type: 'element/box',
    context: { view, edit }
}

export function view(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'box' }, renderChunks(body));
}

export function edit(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'dit' }, [
        'editing!',
        renderChunks(body, 'edit')
    ]);
}
