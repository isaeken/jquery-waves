"use strict";

// jquery-waves 1.1.0
// (c) 2020 İsa Eken
// jquery-waves may be freely distributed under the MIT license.
// for all details and documentation:
// https://github.com/isaeken/jquery-waves

/**
 * throw an error if jquery if not initialized
 */
if (!window.jQuery) {
  throw 'jquery-waves is requires jquery!';
}

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
   * create wave effect to element
   * @param positionX
   * @param positionY
   * @param backgroundColor
   * @param opacity
   * @param duration
   * @param onComplete
   * @returns {jQuery}
   */


  $.fn.waveEffect = function (positionX, positionY) {
    var backgroundColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var opacity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 800;
    var onComplete = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

    /**
     * the target element
     * @type {jQuery.fn.init|jQuery|HTMLElement}
     */
    var $this = $(this);
    /**
     * wave ripple element
     * @type {jQuery.fn.init|jQuery|HTMLElement}
     */

    var $effect = $('<div class="ie-waves-ripple"></div>');
    /**
     * original css position value
     * @type {jQuery}
     */

    var originalPosition = $this.css('position');
    /**
     * original css overflow value
     * @type {jQuery}
     */

    var originalOverflow = $this.css('overflow');
    /**
     * set y position if its lower than 0
     */

    if (positionY < 0) {
      positionY = $this.innerWidth() / 2;
    }
    /**
     * set x position if its lower than 0
     */


    if (positionX < 0) {
      positionX = $(this).innerHeight() / 2;
    }
    /**
     * set background color is random if its not null and 'RANDOM'
     */


    if (backgroundColor != null && backgroundColor.toUpperCase().trim() === 'RANDOM') {
      backgroundColor = randomColor();
    }
    /**
     * set ripple opacity '1' if its null
     */


    if (opacity === null) {
      opacity = '1';
    }
    /**
     * apply styles to ripple
     */


    $effect.css({
      top: positionY,
      left: positionX,
      backgroundColor: backgroundColor,
      opacity: opacity
    });
    /**
     * add ripple to target
     */

    $this.append($effect);
    /**
     * change target styles
     */

    $this.css({
      overflow: 'hidden',
      position: 'relative'
    });
    /**
     * ripple width
     * @type {*|jQuery}
     */

    var size = $this.outerWidth();
    /**
     * set size is target height if target width lower than height
     */

    if ($this.outerWidth() < $this.outerHeight()) {
      size = $this.outerHeight();
    }
    /**
     * set size to complete size
     * @type {number}
     */


    size = size * 2 + 50;
    /**
     * animate ripple
     */

    $effect.animate({
      width: size + 'px',
      height: size + 'px',
      opacity: 0
    }, duration, function () {
      /**
       * remove ripple after animation complete
       */
      $effect.remove();
      /**
       * set target default styles after animation complete
       */

      $this.css({
        position: originalPosition,
        overflow: originalOverflow
      });
      /**
       * call handler after animation complete
       */

      if (typeof onComplete == 'function') {
        onComplete();
      } else {
        eval(onComplete);
      }
    });
    return this;
  };
})(jQuery);
/**
 * document on ready
 */


$(document).ready(function () {
  /**
   * on .waves-effect and [data-waves] click event
   */
  $('.waves-effect, [data-waves]').click(function (event) {
    /**
     * the target element
     * @type {*|jQuery.fn.init|jQuery|HTMLElement}
     */
    var $this = $(this);
    /**
     * ripple background color from data
     * @type {jQuery|jQuery|*|null}
     */

    var backgroundColor = $this.getElementData('waves-background-color', null);
    /**
     * ripple opacity from data
     * @type {jQuery|jQuery|*|null}
     */

    var opacity = $this.getElementData('waves-opacity', null);
    /**
     * ripple animation duration from data
     * @type {number}
     */

    var duration = parseInt($this.getElementData('waves-duration', 800));
    /**
     * ripple complete event from data
     * @type {jQuery|jQuery|*|null}
     */

    var onComplete = $this.getElementData('waves-on-complete', function () {});
    /**
     * calculate clicked position X
     * @type {number}
     */

    var positionX = event.pageX - this.offsetLeft;
    /**
     * calculate clicked position Y
     * @type {number}
     */

    var positionY = event.pageY - this.offsetTop;
    /**
     * execute ripple effect to target
     */

    $this.waveEffect(positionX, positionY, backgroundColor, opacity, duration, onComplete);
  });
});