import {
    GLOBAL_ENV,
} from '../../contants/';

import {
    pickInRange,
} from '../../helpers/';

import {
    getPrivateProp,
} from '../namespace/';

import {
    updateDebounced,
} from '../debounced/';

import {
    addMovement,
    shouldPropagateMovement,
} from '../movement/';

import {
    willOverscroll,
    unlockMovement,
    autoLockMovement,
} from '../overscroll/';

import { addEvent } from '../utils/';

const MIN_VELOCITY = 100;

// save current active scrollbar instance
let activeScrollbar = null;

/**
 * Touch events handler
 * @private
 */
export function handleTouchEvents() {
    const {
        targets,
        touchRecord,
    } = this::getPrivateProp();

    const {
        container,
    } = targets;

    const isDeactivated = () => this::getPrivateProp('isDraging') || (activeScrollbar && activeScrollbar !== this);

    this::addEvent(container, 'touchstart', (evt) => {
        touchRecord.track(evt);

        if (isDeactivated()) return;

        const {
            timerID,
            movement,
        } = this::getPrivateProp();

        // stop scrolling but keep movement for overscrolling
        cancelAnimationFrame(timerID.scrollTo);
        if (!this::willOverscroll('x')) movement.x = 0;
        if (!this::willOverscroll('y')) movement.y = 0;

        this::autoLockMovement();
    });

    this::addEvent(container, 'touchmove', (evt) => {
        touchRecord.update(evt);

        if (isDeactivated()) return;

        let { x, y } = touchRecord.getLatestDelta();

        if (this::shouldPropagateMovement(x, y)) {
            return this::updateDebounced();
        }

        const {
            movement,
            options,
            MAX_OVERSCROLL,
        } = this::getPrivateProp();

        if (movement.x && this::willOverscroll('x', x)) {
            let factor = 2;

            if (options.overscrollEffect === 'bounce') {
                factor += Math.abs(10 * movement.x / MAX_OVERSCROLL);
            }

            if (Math.abs(movement.x) >= MAX_OVERSCROLL) {
                x = 0;
            } else {
                x /= factor;
            }
        }
        if (movement.y && this::willOverscroll('y', y)) {
            let factor = 2;

            if (options.overscrollEffect === 'bounce') {
                factor += Math.abs(10 * movement.y / MAX_OVERSCROLL);
            }

            if (Math.abs(movement.y) >= MAX_OVERSCROLL) {
                y = 0;
            } else {
                y /= factor;
            }
        }

        this::autoLockMovement();

        evt.preventDefault();

        this::addMovement(x, y, true);

        // activate it!
        activeScrollbar = this;
    });

    this::addEvent(container, 'touchcancel touchend', (evt) => {
        touchRecord.release(evt);

        if (isDeactivated()) return;

        if (touchRecord.isActive()) {
            // still active
            return;
        }

        const {
            speed,
        } = this::getPrivateProp('options');

        const velocity = touchRecord.getLatestVelocity();
        const movement = {};

        Object.keys(velocity).forEach(dir => {
            const value = pickInRange(velocity[dir] * GLOBAL_ENV.EASING_MULTIPLIER, -1e3, 1e3);

            // throw small values
            movement[dir] = Math.abs(value) > MIN_VELOCITY ? (value * speed) : 0;
        });

        this::addMovement(
            movement.x,
            movement.y,
            true
        );

        this::unlockMovement();

        activeScrollbar = null;
    });
};
