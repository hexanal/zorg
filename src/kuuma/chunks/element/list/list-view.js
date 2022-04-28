import React from 'react';
import { renderChunk } from '../../../app/renderChunks.js';

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
        /*
        body.map( link => {
            const {
                href = null,
                label = 'Click',
            } = link || {};
            if (!href) return false;

            return React.createElement(
                'li',
                { key: href },
                React.createElement(
                    'a',
                    { href },
                    label
                )
            );
        })
        */
    );
}