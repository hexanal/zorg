import { createElement } from 'react';
import { ping } from 'chunky/pinger.js';

export default {
    type: 'element-button',
    view: Button,
    edit: ButtonEdit
}

export function Button(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    function onClick(e) {
        e.preventDefault();
        // e.stopPropagation(); // @todo
        ping('NAVIGATE', e.target.href);
    } 

    return createElement(
        'a',
        {
            className: 'button',
            href,
            onClick
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
