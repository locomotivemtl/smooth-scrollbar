'use strict';

var _smoothScrollbar = require('../smooth-scrollbar');

function __initReverseWheel() {
    var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.reverseWheel(reverse);
} /**
   * @module
   * @prototype {Function} __initReverseWheel
   */

;

Object.defineProperty(_smoothScrollbar.SmoothScrollbar.prototype, '__initReverseWheel', {
    value: __initReverseWheel,
    writable: true,
    configurable: true
});