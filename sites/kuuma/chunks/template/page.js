import { createElement } from 'react';
import { createChunk } from '../../kuuma.chunky.js';

export default {
    type: 'template-page',
    context: {
        view: Page,
        edit: PageEditor
    }
};

export function Page(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return createElement(
        'div',
        { className: 'default-template' },
        createChunk(body)
    );
}

export function PageEditor(props) {
    const { body = [], onChunkChange: onChange } = props || {};

    function onChunkChange(value) {
        // if (!onChange) return;

        console.log({
            pageEdit: true,
            value,
            body
        })
    }

    return createElement(
        'div',
        {
            className: 'editing-page-here'
        },
        createChunk(
            body,
            { 
                context: 'edit',
                onChunkChange
            }
        )
    );
}