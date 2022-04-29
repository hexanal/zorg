import React from 'react';

export default function P(props) {
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
