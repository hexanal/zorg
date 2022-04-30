import glob from 'glob';
import inputJson from '../processors/input.js';

export default function getPages() {
    const all = glob.sync('./chunks/**/*.json');
    const parsed = all.map(inputJson);
    const pages = parsed.filter(chunkData => {
        const { type = null } = chunkData || {};
        if (!type) return false;

        return type === 'template/page';
    })
    const stripped = pages.map(({ body, ...rest }) => rest);

    // return JSON.stringify(stripped);
    return stripped;
}
