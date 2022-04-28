import React from 'react';

export default function Button(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    return React.createElement(
        'a',
        {
            className: 'button',
            href
        },
        label
    );
}
