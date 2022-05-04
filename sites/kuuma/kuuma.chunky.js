// inits Chunky with the library of chunks, so you can use `createChunk(chunkData, extraProps);` in your React component to render sub-chunks
import createChunky from '../../zorg/chunky/createChunky.js';

import adminEdit from './chunks/admin/adminEdit.js';
import adminPagesList from './chunks/admin/adminPagesList.js';

import elementBox from './chunks/element/elementBox.js';
import elementButton from './chunks/element/elementButton.js';
import elementH1 from './chunks/element/elementH1.js';
import elementH2 from './chunks/element/elementH2.js';
import elementLink from './chunks/element/elementLink.js';
import elementList from './chunks/element/elementList.js';
import elementP from './chunks/element/elementP.js';
import elementShortcut from './chunks/element/elementShortcut.js';
import elementSymbol from './chunks/element/elementSymbol.js';

import templateError500 from './chunks/template/error500.js';
import templatePage from './chunks/template/page.js';

export const library = {
    'admin-edit': adminEdit,
    'admin-pages-list': adminPagesList,
    'element-box': elementBox,
    'element-button': elementButton,
    'element-h1': elementH1,
    'element-h2': elementH2,
    'element-link': elementLink,
    'element-list': elementList,
    'element-p': elementP,
    'element-shortcut': elementShortcut,
    'element-symbol': elementSymbol,
    'template-error500': templateError500,
    'template-page': templatePage,
};

export const createChunk = createChunky(library);