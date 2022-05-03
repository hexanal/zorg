import { createElement } from 'react';
import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import renderChunks from '../../../../zorg/chunky/renderChunks.js';

export default createChunk('template-page', {
    view: Page,
    edit: PageEditor
});

export function Page(props) {
    const { body = [] } = props || {};
    if (body.length === 0) return false;

    return createElement(
        'div',
        { className: 'default-template' },
        renderChunks(body)
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
        });
    }

    return createElement('div', { className: 'editing-page-here' }, renderChunks(body, 'edit', { onChunkChange }));
}
