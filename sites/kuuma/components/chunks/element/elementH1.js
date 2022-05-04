import React from 'react';

export default {
    type: 'element-h1',
    context: {
        view,
    }
}

export function view(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement('h1', null, body);
}
