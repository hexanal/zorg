import React from 'react';

export default function H2(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement('h2', null, body);
}