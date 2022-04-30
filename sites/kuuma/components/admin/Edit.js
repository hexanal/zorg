import { createElement, useState, useEffect } from 'react';
import renderChunks from '../../lib/renderChunks.js';

export default {
    type: 'admin/edit',
    context: { view }
}

export function view(props) {
    // fetch page data
    // renderChunks edit for all its chunks :)1:w
    const [chunkToEdit, setChunkToEdit] = useState(null);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        console.log( params );

        fetch(`/api/get-chunk/${id}`)
            .then(response => response.json())
            .then(data => {
                setChunkToEdit(data);
            })
            .catch(msg => {
                console.error(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-edit' },
        [
            createElement('div', null, 'Hello'),
            chunkToEdit ? createElement('div', null,
                renderChunks(chunkToEdit, 'edit')
            ) : false,
        ]
    );
}

export function edit(props) {
    // fetch page data
    // renderChunks edit for all its chunks :)1:w
    const id = '42';
    const [chunkToEdit, setChunkToEdit] = useState(null);
    
    useEffect(() => {
        fetch(`/api/get-chunk/${id}`)
            .then(response => response.json())
            .then(data => {
                setChunkToEdit(data);
            })
            .catch(msg => {
                console.error(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-edit' },
        [
            createElement('div', null, 'Hello'),
            chunkToEdit ? createElement('div', null,
                renderChunks(chunkToEdit, 'edit')
            ) : false,
        ]
    );
}
