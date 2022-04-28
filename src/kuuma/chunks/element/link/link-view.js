import React from 'react';

export default function Link(props) {
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
