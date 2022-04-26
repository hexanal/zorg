import React from 'react';

export default function list(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return (
        <ul>
            {body.map( link => {
                const {
                    href = null,
                    label = 'Click',
                } = link || {};
                if (!href) return false;

                return (
                    <li key={href}>
                        <a href={href}>
                            {label}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}