import toComponentCore from './toComponent.js';

let COMPONENTS = [];

export default function chunky() {
    // @todo?
    return {
        ping,
        useComponents,
        toComponent,
        connectChunky
    }
}

export function useComponents(components) {
    COMPONENTS = components;
}

export function toComponent(chunkData, props) {
    return toComponentCore(chunkData, props, COMPONENTS);
}
