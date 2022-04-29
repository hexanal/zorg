import glob from 'glob';
import inputJson from './inputJson.js';
// import chunks from '../../../sites/kuuma/chunky/chunks.js';

export default function getPages(props) {
    const all = glob.sync('./chunks/**/*.json');
    const parsed = all.map(inputJson);
    const pages = parsed.filter(chunkData => {
        const { type = null } = chunkData || {};
        if (!type) return false;

        return type === 'template/page';
    })
    const stripped = pages.map(({ body, ...rest }) => rest);

    return JSON.stringify(stripped);
}
