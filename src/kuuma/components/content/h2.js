import React from 'react';

export default function h1(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return (
        <h2>
            {body}
        </h2>
    );
}