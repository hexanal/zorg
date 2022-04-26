import React from 'react';
import Dropdown from '../interface/dropdown';

export default function dropdown(props) {
    const {
        logo = null,
        login = null
    } = props || {};

    return (
        <header class="header">
            {logo ? (<div class="header__logo">
                <Dropdown {...logo} />
            </div>): false}
            {login ? (<div class="header__login">
                <Dropdown {...login} />
            </div>): false}
        </header>
    );
}

