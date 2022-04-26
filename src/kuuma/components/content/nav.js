import React from 'react';

export default function Nav(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'nav',
        null,
        body
    );
}