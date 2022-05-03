import { createElement, useState, useEffect } from 'react';
import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import renderChunks from '../../../../zorg/chunky/renderChunks.js';

export default createChunk('admin-edit', {
    view: ChunkEdit,
    edit: ChunkEditEditor
});

export function ChunkEdit(props) {
    const [chunkToEdit, setChunkToEdit] = useState(null);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');

        fetch(`/api/v1/get-chunk-by-id/${id}`)
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

function ChunkEditEditor(props) {
    // fetch page data
    // renderChunks edit for all its chunks :)1:w
    const id = '42';
    const [chunkToEdit, setChunkToEdit] = useState(null);
    
    useEffect(() => {
        fetch(`/api/v1/get-chunk-by-id/${id}`)
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
