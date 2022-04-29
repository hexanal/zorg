import * as chunks from './chunks.js';
import error from '../app/log/error.js';

const library = Object.values(chunks);

/**
 * takes a type of chunk as string and returns the chunk's object
 * 
 * @param {type} string
 * @returns the found `chunk` object
 */
export default function getChunkByType(type = '') {
    const found = library.find(chnk => chnk.type === type);
    if (!found)
        return error(`no chunk found of type: '${type}'`); // couldn't find an associated chunks

    return found;
}
