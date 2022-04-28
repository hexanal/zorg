import React from 'react';
import renderChunk from '../../renderChunk.js';

export default function List(props) {
    const { items = [] } = props || {};
    if (items.length === 0) return false;

    return React.createElement(
        'ul',
        null,
        items.map(item => React.createElement(
            'li',
            { key: item.id },
            renderChunk(item)
        )),
    );
}