import React from 'react';

export default function nav(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return (
        <nav>
            {body}
        </nav>
    );
}