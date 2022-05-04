import { createElement, useState, useEffect } from 'react';
import { createChunk } from '../../kuuma.chunky.js';

export default {
    type: 'admin-pages-list',
    context: {
        view: AdminPagesList,
        edit: AdminPagesListEditor // @todo?
    }
};

export function AdminPagesList(props) {
    const { body = null } = props || {};
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch('/api/v1/get-chunks-of-type/template-page')
            .then(response => response.json())
            .then(data => {
                setPages(data);
            })
            .catch(msg => {
                console.error(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-pages-view-template' },
        [
            body ? createChunk(body) : false,
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

export function AdminPagesListEditor(props) {
    // const { body = null } = props || {};
    // const [pages, setPages] = useState([]);
    
    // useEffect(() => {
    //     fetch('/api/get-chunks-by-type/template-page')
    //         .then(response => response.json())
    //         .then(data => {
    //             setPages(data);
    //         })
    //         .catch(console.err);
    // }, []);

    return createElement(
        'div',
        { className: 'admin-pages-view-template' },
        'oh hello there!'
    );
}

