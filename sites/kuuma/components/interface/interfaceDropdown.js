import React from 'react';
import { Button } from '../../components/element/elementButton.js';
import { Shortcut } from '../../components/element/elementShortcut.js';

export default function Dropdown(props) {
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
            symbol && React.createElement(Symbol, { name: symbol }, null),
            React.createElement(Button, {...link}, null),
            label && React.createElement('span', { className: 'dropdown__label', }, label),
            shortcut && React.createElement(Shortcut, { ...shortcut }, label),
        ]
    );
}
