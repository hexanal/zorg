import React from 'react';
import Button from '../content/button';
import Shortcut from '../content/shortcut';

export default function dropdown(props) {
    const {
        symbol = null,
        label = null,
        shortcut = null,
        options = []
    } = props || {};

    return (
        <div
            class="dropdown"
        >
            {symbol ? <Symbol name={symbol} /> : false}

            <Button {...link} />

            {label
                ? (
                    <span class="dropdown__label">
                        {label}
                    </span>
                ): false}

            {shortcut
                ? (
                    <Shortcut {...shortcut} />
                ) : false}
        </div>
    );
}
