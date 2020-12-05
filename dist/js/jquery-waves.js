"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// jquery-waves
// (c) 2020 İsa Eken
// jquery-waves may be freely distributed under the MIT license.
// for all details and documentation:
// https://github.com/isaeken/jquery-waves

/**
 * throw an error if jquery is not initialized
 */
if (!window.jQuery) {
  throw 'jquery-waves is requires jquery!';
}
/**
 * throw an error if anime.js is not initialized
 */


if (typeof anime !== 'function') {
  throw 'jquery-waves is required anime.js!';
}
/**
 * The ripple container selector
 * @type {string}
 */


var rippleContainerSelector = '.wave-effect, .waves-effect, [data-waves]';
/**
 * The ripple element class
 * @type {string}
 */

var rippleClass = 'ie-waves-ripple';

(function ($) {
  'use strict';
  /**
   * create random color
   * @returns {string}
   */

  function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
  /**
   * create rgba from hex
   * @param hex
   * @param alpha
   * @returns {string}
   */


  function hex2rgba(hex) {
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var _hex$match$map = hex.match(/\w\w/g).map(function (x) {
      return parseInt(x, 16);
    }),
        _hex$match$map2 = _slicedToArray(_hex$match$map, 3),
        r = _hex$match$map2[0],
        g = _hex$match$map2[1],
        b = _hex$match$map2[2];

    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
  }
  /**
   * get data from element if is exists else returns default value
   * @param key
   * @param defaultValue
   * @returns {jQuery|*|null}
   */


  $.fn.getElementData = function (key) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var $this = $(this);
    var exists = $this[0].hasAttribute('data-' + key);

    if (!exists) {
      return defaultValue;
    }

    return $this.data(key);
  };
  /**
   * Create ripple in container
   * @param x
   * @param y
   * @param completed
   * @returns {*|Window.jQuery|HTMLElement}
   */


  $.fn.ripple = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var completed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    /**
     * The container
     * @type {*|Window.jQuery|HTMLElement}
     */
    var $this = $(this);
    /**
     * The ripple
     * @type {*|Window.jQuery|HTMLElement}
     */

    var $ripple = $("<div class=\"".concat(rippleClass, "\"></div>"));
    /**
     * Background color of ripple
     * @type {string|null}
     */

    var backgroundColor = $this.getElementData('waves-background-color', null);
    /**
     * Opacity of ripple
     * @type {string|int|float|null}
     */

    var opacity = $this.getElementData('waves-opacity', 1);
    /**
     * Animation duration of ripple
     * @type {number}
     */

    var duration = $this.getElementData('waves-duration', 600);
    /**
     * Check and set x, y variables
     */

    if (x == null) {
      x = $this.innerWidth() / 2;
    }

    if (y == null) {
      y = $this.innerHeight() / 2;
    }
    /**
     * Check background color is random
     */


    if (typeof backgroundColor === 'string' && backgroundColor.toLowerCase().trim() === 'random') {
      backgroundColor = hex2rgba(randomColor(), 0.35);
    }
    /**
     * Set ripple css properties
     */


    $ripple.css({
      top: y,
      left: x,
      backgroundColor: backgroundColor,
      opacity: opacity
    });
    /**
     * Set container css properties and append ripple
     */

    $this.css({
      overflow: 'hidden',
      position: 'relative'
    }).append($ripple);
    /**
     * Calculate ripple animated size
     */

    var size = $this.outerWidth(true);

    if ($this.outerWidth(true) < $this.outerHeight(true)) {
      size = $this.outerHeight();
    }

    size = size * 2.5;
    /**
     * Animate ripple
     */

    anime({
      targets: $ripple[0],
      duration: duration,
      easing: 'easeInOutQuad',
      width: size + 'px',
      height: size + 'px',
      update: function update(animation) {
        /**
         * Set animation progress percentage to ripple
         */
        $ripple.data('ripple-animation-progress', Math.round(animation.progress));
      },
      complete: function complete(animation) {
        /**
         * Execute completed event if its function
         */
        if (typeof completed === 'function') {
          completed();
        }
      }
    });
    /**
     * Return ripple
     */

    return $ripple;
  };
  /**
   * Hide ripple from container
   * @param ripple
   */


  $.fn.hideRipple = function (ripple) {
    /**
     * Check the ripple
     */
    if (ripple != null && ripple.length > 0 && ripple.hasClass(rippleClass)) {
      /**
       * Ripple close with animation
       */
      anime({
        targets: ripple[0],
        duration: $(this).getElementData('waves-hide-duration', 800),
        easing: 'easeInOutQuad',
        opacity: 0,
        complete: function complete() {
          ripple.remove();
        }
      });
    }
    /**
     * Return container
     */


    return $(this);
  };
  /**
   * Ripple effect to container
   * @param x
   * @param y
   * @returns {*|Window.jQuery|HTMLElement}
   */


  $.fn.rippleAnimation = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    /**
     * The container
     * @type {*|Window.jQuery|HTMLElement}
     */
    var $this = $(this);
    /**
     * The ripple
     */

    var $ripple = $this.ripple(x, y, function () {
      /**
       * Hide ripple after show animation complete
       */
      $this.hideRipple($ripple);
    });
    /**
     * Return container
     */

    return $this;
  };
})(jQuery);
/**
 * document on ready
 */


$(document).ready(function () {
  /**
   * each all ripple containers
   */
  $(rippleContainerSelector).each(function () {
    /**
     * Ripple container
     * @type {*|Window.jQuery|HTMLElement}
     */
    var $this = $(this);
    /**
     * Ripple
     * @type {*|Window.jQuery|HTMLElement}
     */

    var $ripple = null;
    /**
     * Add events to container
     */

    $this.on('keyup', function () {
      return $this.rippleAnimation();
    }).on('touchstart click focus keydown', function () {
      return null;
    }).on('mousedown', function (event) {
      return $ripple = $this.ripple(event.pageX - $this.offset().left, event.pageY - $this.offset().top);
    }).on('touchend mouseup mouseleave blur dragleave', function (event) {
      return $this.hideRipple($ripple);
    });
  });
});