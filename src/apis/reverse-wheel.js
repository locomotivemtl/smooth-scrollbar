/**
 * @module
 * @prototype {Function} reverseWheel
 */

import { SmoothScrollbar } from '../smooth-scrollbar';

/**
 * @method
 * @api
 * Invert the axis of the `wheel` event
 *
 * @param {Boolean} [reverse]: if true, the axis of the `wheel` event will be inverted
 */
SmoothScrollbar.prototype.reverseWheel = function (reverse = false) {
    this.wheelReversed = (typeof reverse === 'boolean') ? reverse : false;
    this.__readonly('wheelReversed', this.wheelReversed);
};
