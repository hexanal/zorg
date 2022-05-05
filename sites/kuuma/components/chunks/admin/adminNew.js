import { createElement, useState, useEffect } from 'react';
import { chunkToComponent } from '../../../kuuma.chunky.js';

// @todo
/*
export default {
    view: AdminNew,
    edit: ...
}
*/
export default {
    type: 'admin-new',
    context: {
        view: AdminNew,
    }
};

export function AdminNew(props) {
    return createElement(
        'div',
        { className: 'admin-edit' },
        [
            createElement('div', null, 'here, land a `chunks` type field, that allows to build out the structure of this chunk from other chunk types :)'),
        ]
    );
}
