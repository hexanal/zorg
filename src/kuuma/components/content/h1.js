import React from 'react';

export default function h1(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return (
        <h1>
            {body}
        </h1>
    );
}