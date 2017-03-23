'use strict';

var _smoothScrollbar = require('../smooth-scrollbar');

/**
 * @method
 * @api
 * Invert the axis of the `wheel` event
 *
 * @param {Boolean} [reverse]: if true, the axis of the `wheel` event will be inverted
 */
_smoothScrollbar.SmoothScrollbar.prototype.reverseWheel = function () {
  var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  this.wheelReversed = typeof reverse === 'boolean' ? reverse : false;
  this.__readonly('wheelReversed', this.wheelReversed);
}; /**
    * @module
    * @prototype {Function} reverseWheel
    */