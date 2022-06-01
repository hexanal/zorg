import { v4 as uuid } from 'uuid';
import { write } from 'zorg/files.js';

export default function createCreateChunk(app, options) {
    app.post('/api/v1/create-chunk', function(req, res) {
        const { body } = req || {};
        const { id = null, type = null } = body || {};
        const timestamp = Date.now();
        const destination = `./json`;
        const filename = `${type}/${id ? id : 'noid_'}${timestamp}.json`;
        const contents = JSON.stringify({
            uuid: uuid(),
            ...body,
        });

        return write(destination, filename, contents)
            .then(() => {
                res.json({
                    success: true,
                    contents
                });
            });
    });
}
