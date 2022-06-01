import React from 'react';

export default {
    type: 'element-h1',
    view,
}

export function view(props) {
    const { content = null } = props || {};
    if (!content) return false;

    return React.createElement('h1', null, content);
}
