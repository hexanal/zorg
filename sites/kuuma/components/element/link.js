import React from 'react';
import { ping } from 'chunky/pinger.js';

export default {
    type: 'element-link',
    view: Link
}

export function Link(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    function onClick(e) {
        e.preventDefault();
        // e.stopPropagation(); // @todo
        console.log(e);
        ping('NAVIGATE', e.href);
    } 

    return React.createElement(
        'a',
        {
            className: 'link',
            href,
            onClick,
        },
        label
    );
}
