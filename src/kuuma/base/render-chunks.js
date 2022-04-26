import allChunks from '../components/index.js';

export default function renderChunks(chunks) {
    return chunks.map( chunk => {
        const { id = ''} = chunk;
        const Component = allChunks[chunk.component];

        return (
            <Component key={id} {...chunk} />
        );
    });
}
