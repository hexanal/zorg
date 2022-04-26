import renderChunks from '../../base/render-chunks.js';

export default function Default(data, config) {
    const { body = [] } = data || {};

    return (
        <div className="default-template">
            {renderChunks(body)}
        </div> 
    );
}
