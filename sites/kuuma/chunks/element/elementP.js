import React, { useState } from 'react';

export default {
    type: 'element-p',
    context: {
        view: P,
        edit: PEditor
    }
};

export function P(props) {
    const { body = null } = props || {};
    if (!body) return false;

    return React.createElement(
        'p',
        null,
        body
    );
}

export function PEditor(props) {
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
        {
            type: 'text',
            onChange,
            value: body
        },
        null
    );
}
