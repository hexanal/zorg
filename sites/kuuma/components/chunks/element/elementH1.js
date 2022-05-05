import React from 'react';

export default {
    view,
}

export function view(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement('h1', null, body);
}
