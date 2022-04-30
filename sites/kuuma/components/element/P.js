import React from 'react';

export function view(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'p',
        null,
        body
    );
}

export function edit(props) {
    const { body = null } = props || {};
    if (!body) return false;

    function onChange(e) {
        console.log(e);
    };

    return React.createElement(
        'input',
        { type: 'text', onChange, value: body },
        null
    );
}

export default {
    type: 'element/p',
    context: { view, edit }
}
