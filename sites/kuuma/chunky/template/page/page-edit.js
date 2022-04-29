import React from 'react';
import renderChunks from '../../renderChunks.js';

export default function Page(props) {
    const { body = [] } = props || {};

    return React.createElement('div', { className: 'editing-page-here' }, renderChunks(body, 'edit'));
}
