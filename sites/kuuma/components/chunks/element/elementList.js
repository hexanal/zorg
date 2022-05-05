import React from 'react';
import { chunkToComponent } from '../../../kuuma.chunky.js';

export default {
    view: List
};
    
export function List(props) {
    const { items = [] } = props || {};
    if (items.length === 0) return false;

    return React.createElement(
        'ul',
        null,
        items.map(item => React.createElement(
            'li',
            { key: item.id },
            chunkToComponent(item)
        )),
    );
}