import React from 'react';

export default {
    type: 'element-link',
    context: { view }
}

export function view(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    return React.createElement(
        'a',
        {
            className: 'link',
            href
        },
        label
    );
}
