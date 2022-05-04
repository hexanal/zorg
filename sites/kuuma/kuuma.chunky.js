import chunky from '../../zorg/chunky/chunky.js';
// inits Chunky with the library of chunks, so you can use `chunkToComponent(chunkData, extraProps);` in your React component to render sub-chunks

import adminEdit from './components/chunks/admin/adminEdit.js';
import adminPagesList from './components/chunks/admin/adminPagesList.js';

import elementBox from './components/chunks/element/elementBox.js';
import elementButton from './components/chunks/element/elementButton.js';
import elementH1 from './components/chunks/element/elementH1.js';
import elementH2 from './components/chunks/element/elementH2.js';
import elementLink from './components/chunks/element/elementLink.js';
import elementList from './components/chunks/element/elementList.js';
import elementP from './components/chunks/element/elementP.js';
import elementShortcut from './components/chunks/element/elementShortcut.js';
import elementSymbol from './components/chunks/element/elementSymbol.js';

import templateError500 from './components/chunks/template/error500.js';
import templatePage from './components/chunks/template/page.js';

export const {
    chunkToComponent,
    chunks
} = chunky({
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
});
