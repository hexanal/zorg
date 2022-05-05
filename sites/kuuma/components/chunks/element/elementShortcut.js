import { createElement } from 'react';

export default {
    view: Shortcut,
    edit: ShortcutEdit
};

export function Shortcut(props) {
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
};

export function ShortcutEdit(props) {
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
