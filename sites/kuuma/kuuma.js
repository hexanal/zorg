import ReactDOM from 'react-dom/client';
import { createElement, useState, useEffect, useCallback } from 'react';
import { toComponent, useComponents } from 'chunky';
import { ping, pong } from 'chunky/pinger.js';
import * as components from './components/index.js';

useComponents(components);

// pings
function chunkItUp(chunk) {
    const [currentChunk, setCurrentChunk] = useState(chunk);

    useEffect(() => {
        const onPopState = ({state}) => {
            console.log(state);
            const { url = null } = state || {};
            if (!url) return;
            const destination = `${window.location.origin}${url}`;
            ping('NAVIGATE', destination);
        };

        window.addEventListener('popstate', onPopState);

        const pings = [
            pong('NAVIGATE', url => {
                const { pathname = null } = new URL(url);

                ping('LOG', {
                    msg: `navigation to :`,
                    url,
                });
                ping('START_NAVIGATION', url);

                const endpoint = pathname === '/'
                    ? `/api/v1/get-home`
                    : `/api/v1/get-page-by-url/${pathname.replace('/', '')}`;

                fetch(endpoint)
                    .then(response => response.json())
                    .then(chunk => ping('END_NAVIGATION', chunk))
                    .catch(msg => console.error(msg));
            }),

            pong('END_NAVIGATION', chunk => {
                const { url = null } = chunk || {};
                if (!url) return;

                history.pushState(chunk, '', url);
                setCurrentChunk(chunk);
            }),

            pong('CHUNK_CHANGE', chunk => {
                const endpoint = `/api/v1/create-chunk`;
                const {
                    context,
                    onChunkChange,
                    children,
                    ...body
                } = chunk || {};

                // ping('START_CREATE_CHUNK', body);
                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    // .then(chunk => ping('CREATED_CHUNK', chunk))
                    .then(chunk => {
                        console.log(chunk);
                        return chunk;
                    })
                    // .then(chunk => ping('END_CREATE_CHUNK', chunk))
                    .catch(msg => console.error(msg));
            }),
        ];

        return () => {
            pings.map(flush => flush());
            window.removeEventListener('popstate', onPopState);
        }
    }, [currentChunk, setCurrentChunk]);

    return toComponent(currentChunk);
}

ReactDOM.hydrateRoot(
    document.getElementById('root'),
    createElement(
        chunkItUp,
        PAGE_CHUNK,
        null
    )
);
