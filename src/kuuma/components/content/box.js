import renderChunks from '../../base/render-chunks.js';

export default function box(data) {
    const { body = [] } = data || {};

    return (
        <div className="box">
            {renderChunks(body)}
        </div> 
    );
}
