import React from 'react';
import renderChunks from '../../base/render-chunks.js';

export default function Box(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'box' }, renderChunks(body));
}
