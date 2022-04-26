import React from 'react';
import renderChunks from '../../base/render-chunks.js';

export default function Default(props) {
    const { body = [] } = props || {};

    function onClick(e) {
        console.log('hey hey hey hey hey');
    }

    return React.createElement(
        'div',
        { className: 'default-template' },
        [
            React.createElement(
                'button',
                {
                    className: 'button',
                    type: 'button',
                    onClick
                },
                'WOAH!'
            ),
            renderChunks(body)
        ]
    );
}
