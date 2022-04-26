import React from 'react';
import Dropdown from './Dropdown.js';

export default function Header(props) {
    const {
        logo = null,
        login = null
    } = props || {};

    return React.createElement(
        'header',
        { className: 'header' },
        [
            logo && React.createElement(
                'div',
                { className: 'header__logo', },
                React.createElement(
                    Dropdown,
                    {...logo},
                    null
                )
            ),
            login && React.createElement(
                'div',
                { className: 'header__login' },
                React.createElement(
                    Dropdown,
                    {...login},
                    null
                )
            )
        ]
    );
}

