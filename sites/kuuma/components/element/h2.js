import React from 'react';

export default {
    type: 'element-h2',
    view, edit
}

export function view(props) {
    const { content = null } = props || {};
    if (!content) return false;

    return React.createElement(
        'h2',
        null,
        content
    );
}

export function edit(props) {
    const { content = null } = props || {};
    if (!content) return false;

    return React.createElement(
        'input',
        { type: 'text', value: content },
        null
    );
}