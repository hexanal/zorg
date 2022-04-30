import React from 'react';

export function view(data, config) {
    return React.createElement(
        'div',
        { className: 'error-500-template' },
        'Error 500'
    );
}

export default {
    type: 'template/error500',
    context: { view }
}
