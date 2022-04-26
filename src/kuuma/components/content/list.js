import React from 'react';

export default function List(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return React.createElement(
        'ul',
        null,
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
    );
}