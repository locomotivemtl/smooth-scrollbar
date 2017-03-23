/**
 * @module
 * @prototype {Function} __initReverseWheel
 */

import { SmoothScrollbar } from '../smooth-scrollbar';

function __initReverseWheel(reverse = false) {
    this.reverseWheel(reverse);
};

Object.defineProperty(SmoothScrollbar.prototype, '__initReverseWheel', {
    value: __initReverseWheel,
    writable: true,
    configurable: true,
});
