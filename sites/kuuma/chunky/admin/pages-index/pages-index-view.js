import { createElement, useState, useEffect } from 'react';
import renderChunks from '../../renderChunks.js';

// @todo something like plop, blueprint
// `blueprint =`import React, { createElement as e } from 'react';`
export default function PagesIndex(props) {
    const { body = null } = props || {};
    const [pages, setPages] = useState([]);
    
    useEffect(() => {
        fetch('/api/get-pages')
            .then(response => response.json())
            .then(data => {
                setPages(data);
            })
            .catch(msg => {
                console.log(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-pages-view-template' },
        [
            body ? renderChunks(body) : false,
            pages.length !== 0
                ? pages.map(page => createElement(
                    'div',
                    null,
                    `page url: ${page.url}`
                ))
                : false
        ]
    );
}
