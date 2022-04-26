import React from 'react';

export default function shortcut(props) {
    const {
        label = null,
        bindings = 'keyboard'
    } = props || {};
    if (!label) return false;

    return (
        <span className={`shortcut shortcut-bindings-${bindings}`}>
            {label}
        </span>
    );
}
