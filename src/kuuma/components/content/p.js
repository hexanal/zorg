import React from 'react';

export default function p(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return (
        <p>
            {body}
        </p>
    );
}
