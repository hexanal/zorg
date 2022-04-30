import React from 'react';

export default {
    type: 'element/h2',
    context: { view }
}

export function view(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement('h2', null, body);
}
