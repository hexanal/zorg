import { createElement } from 'react';

export default {
    type: 'element-symbol',
    context: { view }
}

export function view(props) {
    const { attr = null } = props || {};
    if (!attr) return false;

    const {
        width = 15,
        height = 15,
        viewBox = '0 0 15 15',
        fill = 'none',
        xmlns = "http://www.w3.org/2000/svg",
    } = attr || {}; // provide defaults

    return createElement('svg', {
        width,
        height,
        viewBox,
        fill,
        xmlns
    }, body);
}
