/**
 * @module
 * @prototype {Function} __keyboardHandler
 */

import { SmoothScrollbar } from '../smooth-scrollbar';

const KEY_CODE = {
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

/**
 * @method
 * @internal
 * Keypress event handler builder
 */
function __keyboardHandler() {
    const { targets } = this;

    const getKeyDelta = (keyCode) => {
        // key maps [deltaX, deltaY, useSetMethod]
        const { size, offset, limit, movement } = this; // need real time data

        const utils = { KEY_CODE };

        switch (keyCode) {
        case utils.KEY_CODE.SPACE:
            return [0, 200];
        case utils.KEY_CODE.PAGE_UP:
            return [0, -size.container.height + 40];
        case utils.KEY_CODE.PAGE_DOWN:
            return [0, size.container.height - 40];
        case utils.KEY_CODE.END:
            return [0, Math.abs(movement.y) + limit.y - offset.y];
        case utils.KEY_CODE.HOME:
            return [0, -Math.abs(movement.y) - offset.y];
        case utils.KEY_CODE.LEFT:
            return [-40, 0];
        case utils.KEY_CODE.UP:
            return [0, -40];
        case utils.KEY_CODE.RIGHT:
            return [40, 0];
        case utils.KEY_CODE.DOWN:
            return [0, 40];
        default:
            return null;
        }
    };

    const { container } = targets;

    this.__addEvent(container, 'keydown', (evt) => {
        if (document.activeElement !== container) return;

        const { options, parents, movementLocked } = this;

        const delta = getKeyDelta(evt.keyCode || evt.which);

        if (!delta) return;

        const [x, y] = delta;

        if (this.__shouldPropagateMovement(x, y)) {
            container.blur();

            if (parents.length) {
                parents[0].focus();
            }

            return this.__updateThrottle();
        }

        evt.preventDefault();

        this.__unlockMovement(); // handle for multi keypress
        if (x && this.__willOverscroll('x', x)) movementLocked.x = true;
        if (y && this.__willOverscroll('y', y)) movementLocked.y = true;

        const { speed } = options;
        this.__addMovement(x * speed, y * speed);
    });

    this.__addEvent(container, 'keyup', () => {
        this.__unlockMovement();
    });
};

Object.defineProperty(SmoothScrollbar.prototype, '__keyboardHandler', {
    value: __keyboardHandler,
    writable: true,
    configurable: true,
});
