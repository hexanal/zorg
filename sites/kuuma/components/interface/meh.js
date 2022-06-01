import React from 'react';

export default {
    type: 'meh',
    view: Meh,
    edit: MehEditor
};

function Meh(props) {
    const {
        hey = ''
    } = props || {};

    return React.createElement(
        'div',
        { className: 'meh' },
        hey
    );
}

function MehEditor(props) {
    return React.createElement(
        'div',
        { className: 'meh' },
        'Edit some meh shit'
    ); 
}
