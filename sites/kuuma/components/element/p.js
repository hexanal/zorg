import React, { useState } from 'react';
import { ping } from 'chunky/pinger.js';

export default {
    type: 'element-p',
    view: P,
    edit: PEditor
};

export function P(props) {
    const { content = null } = props || {};
    if (!content) return false;

    return React.createElement(
        'p',
        null,
        content
    );
}

export function PEditor(props) {
    const { content = null } = props || {};
    if (!content) return false;

    const [currentContent, setCurrentContent] = useState(content);

    function onChange(e) {
        const newContent = e.target.value;

        setCurrentContent(newContent);

        ping('CHUNK_CHANGE', {
            ...props,
            content: newContent
        });
    }

    return React.createElement(
        'input',
        {
            type: 'text',
            value: currentContent,
            onChange,
        },
        null
    );
}
