import React from 'react';

export default function H1(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement('h1', null, body);
}