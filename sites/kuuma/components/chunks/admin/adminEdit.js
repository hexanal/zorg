import { createElement, useState, useEffect } from 'react';
import { chunkToComponent } from '../../../kuuma.chunky.js';

export default {
    view: AdminEdit,
};

export function AdminEdit(props) {
    const [chunkToEdit, setChunkToEdit] = useState(null);
    
    // @todo could probably be turned into a neat hook
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
            chunkToComponent(chunkToEdit, { context: 'edit' })
            ) : false,
        ]
    );
}
