import { createElement, useState, useEffect } from 'react';
import renderChunks from '../../renderChunks.js';

export default function Edit(props) {
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
