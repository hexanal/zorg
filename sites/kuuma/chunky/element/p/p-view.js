import React from 'react';

export default function P(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'p',
        null,
        body
    );
}
