import React, { useState, useEffect } from 'react';
import { toComponent } from 'chunky';

export default {
    type: 'wussup',
    view: Wussup,
};

export function Wussup(props) {
    const [gamepad, setGamepad] = useState(null);
    const { buttons = [] } = gamepad || {};
    // const [gamepad, setGamepad] = useState(null);

    function logPressed(button, i) {
        const { pressed = false } = button || {};

        if (pressed) {
            console.log(`button ${i} is pressed`);
        }
    }

    useEffect(() => {
        let raf = null;

        const loop = function(t) {
            buttons.map(logPressed);

            raf = window.requestAnimationFrame(loop);
        };

        loop();

        return () => {
            if (raf) {
                window.cancelAnimationFrame(raf);
            }
        };
    }, [buttons]);

    useEffect(() => {
        window.addEventListener('gamepadconnected', (e) => {
            const connectedGamepad = navigator.getGamepads()[e.gamepad.index];

            console.log({
                buttons: connectedGamepad.buttons
            });

            setGamepad(connectedGamepad);
        });
    }, [gamepad]);

    return React.createElement('div', { className: 'box' }, null);
}
