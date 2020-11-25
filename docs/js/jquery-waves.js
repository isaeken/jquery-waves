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
    var $this = $(this);
    var $effect = $('<div class="ie-waves-effect"></div>');
    var originalPosition = $this.css('position');
    var originalOverflow = $this.css('overflow');

    if (positionY < 0) {
      positionY = $this.innerWidth() / 2;
    }

    if (positionX < 0) {
      positionX = $(this).innerHeight() / 2;
    }

    if (backgroundColor != null && backgroundColor.toUpperCase().trim() === 'RANDOM') {
      backgroundColor = randomColor();
    }

    if (opacity === null) {
      opacity = '0.15';
    }

    $effect.css({
      top: positionY,
      left: positionX,
      backgroundColor: backgroundColor,
      opacity: opacity
    });
    $this.append($effect);
    $this.css({
      overflow: 'hidden',
      position: 'relative'
    });
    var size = $(this).outerWidth();

    if ($this.outerWidth() < $this.outerHeight()) {
      size = $this.outerHeight();
    }

    $effect.animate({
      width: size * 2 + 50 + 'px',
      height: size * 2 + 50 + 'px',
      opacity: 0
    }, duration, function () {
      $effect.remove();
      $this.css({
        position: originalPosition,
        overflow: originalOverflow
      });
      onComplete();
    });
    return this;
  };
})(jQuery);

$(document).ready(function () {
  $('.waves-effect, [data-waves]').click(function (event) {
    var $this = $(this);
    var backgroundColor = $this.getElementData('waves-background-color', null);
    var opacity = $this.getElementData('waves-opacity', null);
    var duration = parseInt($this.getElementData('waves-duration', 800));
    var onComplete = $this.getElementData('waves-on-complete', function () {});
    var positionX = event.pageX - this.offsetLeft;
    var positionY = event.pageY - this.offsetTop;
    $this.waveEffect(positionX, positionY, backgroundColor, opacity, duration, onComplete);
  });
});