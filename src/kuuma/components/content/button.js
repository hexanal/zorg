import React from 'react';

export default function button(props) {
    const {
        href = null,
        label = 'Click',
    } = props || {};
    if (!href) return false;

    return (
        <a className="button" href={href}>
            {label}
        </a>
    );
}
