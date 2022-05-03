import { createElement } from 'react';

export default {
    type: 'element-button',
    context: { view, edit }
}

export function view(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    return createElement(
        'a',
        {
            className: 'button',
            href
        },
        label
    );
}

export function edit(props) {
    return createElement(
        'div',
        {
            className: 'button',
        },
        'edit this button yo'
    );
}
