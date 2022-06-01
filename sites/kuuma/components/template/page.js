import { createElement, useState, useEffect, useCallback } from 'react';
import { toComponent } from 'chunky';
import { ping, pong, unpong } from 'chunky/pinger.js';

// pass props...
// pass *same* props?
export const styles = function(props) {
    const { component = 'page' } = props || {};
    // const { colors } = useColors();

    return `
.~~ {
    display: block;
}

.~~Whatever {
    background-color: hotpink;
    /* background-color: ; what the fuck?! */
}

.~~Cool {
    cursor: crosshair; 
}

    `
    .replace('~~', `${component}someRandomStringBasedOnProps?`)
    .replace('fuck' `fudge`);
}

export default {
    type: 'page',
    view: Page,
    edit: PageEditor
};

export function Page(chunk) {
    const { header = null, chunks = [] } = chunk || {};
    // const [userText, setUserText] = useState("");
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        ping('LOG', { key });
        if(keyCode === 65) {
            ping('SEND_A', { whatever: 'cool', key });
        }
    }, []);

    pong('MAKE_ME', stuff => {
        console.log(stuff);
    });

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    // return `
    //     <div class="${className}">
    //         <main>
    //             ${toComponent(chunks)}
    //         </main>
    //     </div>
    // `;

    return createElement(
        'div',
        { className: 'default-template' },
        [
            // header && toComponent(header),
            createElement(
                'main',
                null,
                [
                    toComponent(chunks)
                ]
            )
        ]
    );
}

export function PageEditor(props) {
    const { chunks = [] } = props || {};

    return createElement(
        'div',
        {
            className: 'editing-page-here'
        },
        createElement(
            'div',
            {
                className: 'chunks-field'
            }, 
            [
                toComponent(chunks, { 
                    context: 'edit',
                })
            ]
        )
    );
}
