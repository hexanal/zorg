import { createElement } from 'react';
// import renderChunks from '../../renderChunks.js';

export default function Edit(props) {
    // fetch page data
    // renderChunks edit for all its chunks :)1:w

    return createElement(
        'div',
        { className: 'admin-edit' },
        [
            createElement('div', null, 'Hello'),
        ]
    );
}
