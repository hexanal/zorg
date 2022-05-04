import React from 'react';
import { createChunk } from '../../kuuma.chunky.js';

export default {
    type: 'element-list',
    context: { view }
};
    
export function view(props) {
    const { items = [] } = props || {};
    if (items.length === 0) return false;

    return React.createElement(
        'ul',
        null,
        items.map(item => React.createElement(
            'li',
            { key: item.id },
            createChunk(item)
        )),
    );
}