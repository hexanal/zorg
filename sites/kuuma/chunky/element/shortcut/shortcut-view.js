import React from 'react';

export default function Shortcut(props) {
    const {
        label = null,
        bindings = 'keyboard'
    } = props || {};
    if (!label) return false;

    return React.createElement(
        'span',
        { className: `shortcut shortcut-bindings-${bindings}` },
        label
    );
}
