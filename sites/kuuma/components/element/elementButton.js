import { createElement } from 'react';

export default {
    type: 'element-button',
    context: {
        view: Button,
        edit: ButtonEdit
    }
}

export function Button(props) {
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

export function ButtonEdit(props) {
    return createElement(
        'div',
        {
            className: 'button',
        },
        'edit this button yo'
    );
}
