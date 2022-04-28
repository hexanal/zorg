import { createElement as e } from 'react';
import renderChunks from '../../renderChunks.js';

// @todo something like plop, blueprint
// `blueprint = `import React, { createElement as e } from 'react';`
export default function Page(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return e(
        'div',
        { className: 'default-template' },
        renderChunks(body)
    );
}
