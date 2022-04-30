import { createElement } from 'react';
import renderChunks from '../../lib/renderChunks.js';

export function view(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return createElement(
        'div',
        { className: 'default-template' },
        renderChunks(body)
    );
}

export function edit(props) {
    const { body = [] } = props || {};

    return createElement('div', { className: 'editing-page-here' }, renderChunks(body, 'edit'));
}

export default {
    type: 'template/page',
    context: { view, edit }
}
