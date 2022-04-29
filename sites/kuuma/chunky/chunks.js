// @note we don't really care about the "as" name here, do we?
// I mean, we're getting the chunk from its `type` key, so....
// export all the `chunks` here so that we can import the lot of them in one fell swoop
export { default as json } from './json/json.js';

export { default as elementbox } from './element/box/box.js';
export { default as elementbutton } from './element/button/button.js';
export { default as elementh1 } from './element/h1/h1.js';
export { default as elementh2 } from './element/h2/h2.js';
export { default as elementp } from './element/p/p.js';
export { default as elementlist } from './element/list/list.js';
export { default as elementlink } from './element/link/link.js';
export { default as elementshortcut } from './element/shortcut/shortcut.js';

export { default as templatePage } from './template/page/page.js';
export { default as templateError500 } from './template/error500/error500.js';

export { default as adminPages } from './admin/pages-index/pages-index.js';
export { default as adminEdit } from './admin/edit/edit.js';
