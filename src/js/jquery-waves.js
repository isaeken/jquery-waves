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
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $.fn.getElementData = function (key, defaultValue = null) {
        const $this = $(this);
        let exists = $this[0].hasAttribute('data-' + key);
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
    $.fn.waveEffect = function (positionX, positionY, backgroundColor = null, opacity = null, duration = 800, onComplete = function () {}) {
        const $this = $(this);
        const $effect = $('<div class="ie-waves-effect"></div>');
        let originalPosition = $this.css('position');
        let originalOverflow = $this.css('overflow');

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
            opacity: opacity,
        });

        $this.append($effect);
        $this.css({
            overflow: 'hidden',
            position: 'relative',
        });

        let size = $(this).outerWidth();

        if ($this.outerWidth() < $this.outerHeight()) {
            size = $this.outerHeight();
        }

        $effect.animate({
            width: (size * 2 + 50) + 'px',
            height: (size * 2 + 50) + 'px',
            opacity: 0,
        }, duration, function () {
            $effect.remove();
            $this.css({
                position: originalPosition,
                overflow: originalOverflow,
            });
            onComplete();
        });

        return this;
    };
}) (jQuery);

$(document).ready(() => {
    $('.waves-effect, [data-waves]').click(function (event) {
        const $this = $(this);
        let backgroundColor = $this.getElementData('waves-background-color', null);
        let opacity = $this.getElementData('waves-opacity', null);
        let duration = parseInt($this.getElementData('waves-duration', 800));
        let onComplete = $this.getElementData('waves-on-complete', function () {});

        let positionX = event.pageX - this.offsetLeft;
        let positionY = event.pageY - this.offsetTop;

        $this.waveEffect(positionX, positionY, backgroundColor, opacity, duration, onComplete);
    });
});
