import React from 'react';
import { toComponent } from 'chunky';

export default {
    type: 'element-list',
    view: List
};
    
export function List(props) {
    const { chunks = [] } = props || {};
    if (chunks.length === 0) return false;

    return React.createElement(
        'ul',
        null,
        chunks.map(item => React.createElement(
            'li',
            { key: item.id },
            toComponent(item)
        )),
    );
}