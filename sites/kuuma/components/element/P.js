import React, { useState } from 'react';
/*
import ChunkyTextField from '../../../../zorg/chunky/fields/text/ChunkyTextField.js';

export function PEditor(props) {
    // @todo blah blah all the props destructuring, events, etc.

    return React.createElement(
        ChunkyTextField,
        { ...props },
        null
    );
}

//////// chunky text field
export default function ChunkyTextField(props) {

    return React.createElement(
        input,
        { ...props },
        null
    );
}


*/

export default {
    type: 'element-p',
    context: { view, edit }
}

export function view(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'p',
        null,
        body
    );
}

export function edit(props) {
    const { body = null, onChunkChange = null } = props || {};
    if (!body) return false;

    // const [paragraph, setParagraph] = useState(body);

    function onChange(e) {
        if (!onChunkChange) return;

        console.log({ p: true, e });

        onChunkChange(e.target.value);
    };

    return React.createElement(
        'input',
        { type: 'text', onChange, value: body },
        null
    );
}
