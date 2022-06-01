import React from 'react';
import { Button } from '../element/button.js';
import { Shortcut } from '../element/shortcut.js';
import { Symbol } from '../element/symbol.js';

export default {
    type: 'interface-dropdown',
    view: Dropdown,
}

export function Dropdown(props) {
    const {
        symbol = null,
        label = null,
        shortcut = null,
        // options = []
    } = props || {};

    return React.createElement(
        'div',
        { className: 'dropdown' },
        [
            symbol && (
                React.createElement(Button, {
                    href: '#',
                    label: React.createElement(Symbol, { name: symbol }, null),
                }, null)
            ),
            label && React.createElement('span', { className: 'dropdown__label', }, label),
            shortcut && React.createElement(Shortcut, { ...shortcut }, label),
        ]
    );
}
