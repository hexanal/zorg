import { createElement } from 'react';

export default {
    type: 'element/shortcut',
    context: { view, edit }
};

export function view(props) {
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
}

export function edit(props) {
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
