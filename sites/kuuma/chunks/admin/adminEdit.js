import { createElement, useState, useEffect } from 'react';
import { renderChunkEdit } from '../../kuuma.chunky.js'

export default {
    type: 'admin-edit',
    context: {
        view: ChunkEdit,
    }
};

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
            renderChunkEdit(chunkToEdit)
            ) : false,
        ]
    );
}
