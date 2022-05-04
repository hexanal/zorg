import React from 'react';

export default {
    type: 'element-h2',
    context: { view, edit }
}

export function view(props) {

    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'h2',
        null,
        body
    );
}

export function edit(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'input',
        { type: 'text', value: body },
        null
    );
}