import { createElement } from 'react';
import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import renderChunk from '../../../../zorg/chunky/renderChunk.js';

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
        renderChunk(body)
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

    return createElement('div', { className: 'editing-page-here' }, renderChunk(body, 'edit', { onChunkChange }));
}
