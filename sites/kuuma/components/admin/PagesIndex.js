import { createElement, useState, useEffect } from 'react';
import renderChunks from '../../lib/renderChunks.js';

export default {
    type: 'admin/pages-index',
    context: { view }
}

export function view(props) {
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

export function edit(props) {
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

