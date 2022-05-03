import { createElement, useState, useEffect } from 'react';
import createChunk from '../../../../zorg/chunky/client/createChunk.js';
import renderChunk from '../../../../zorg/chunky/renderChunk.js';

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
                renderChunk(chunkToEdit, 'edit')
            ) : false,
        ]
    );
}

function ChunkEditEditor(props) {
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
                renderChunk(chunkToEdit, 'edit')
            ) : false,
        ]
    );
}
