import React from 'react';

export default function Error500(data, config) {
    return React.createElement(
        'div',
        { className: 'error-500-template' },
        'Error 500'
    );
}
