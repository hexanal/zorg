import * as components from '../components/index.js';

const library = Object.values(components);

/**
 * takes a type of chunk as string and returns the chunk's object
 * 
 * @param {type} string
 * @returns the found `chunk` object
 */
export default function getComponentByChunkType(type = '') {
    const found = library.find(chnk => chnk.type === type);
    if (!found) {
        console.error(`no chunk found of type: '${type}'`); // couldn't find an associated chunks
        return;
    }

    return found;
}
