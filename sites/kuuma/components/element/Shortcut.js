import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import { createElement } from 'react';

export default createChunk('element-shortcut', {
    view(props) {
        const {
            label = null,
            bindings = 'keyboard'
        } = props || {};
        if (!label) return false;

        return createElement(
            'span',
            { className: `shortcut shortcut-bindings-${bindings}` },
            label
        );
    },

    edit(props) {
        const {
            label = null,
            bindings = 'keyboard'
        } = props || {};
        if (!label) return false;

        return createElement(
            'span',
            { className: `edit` },
            [
                'editing!:',
                label
            ]
        );
    }
})
