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

    /**
     * get data from element if is exists else returns default value
     * @param key
     * @param defaultValue
     * @returns {jQuery|*|null}
     */
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
        /**
         * the target element
         * @type {jQuery.fn.init|jQuery|HTMLElement}
         */
        const $this = $(this);

        /**
         * wave ripple element
         * @type {jQuery.fn.init|jQuery|HTMLElement}
         */
        const $effect = $('<div class="ie-waves-ripple"></div>');

        /**
         * original css position value
         * @type {jQuery}
         */
        let originalPosition = $this.css('position');

        /**
         * original css overflow value
         * @type {jQuery}
         */
        let originalOverflow = $this.css('overflow');

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
         * set ripple opacity '0.15' if its null
         */
        if (opacity === null) {
            opacity = '0.15';
        }

        /**
         * apply styles to ripple
         */
        $effect.css({
            top: positionY,
            left: positionX,
            backgroundColor: backgroundColor,
            opacity: opacity,
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
            position: 'relative',
        });

        /**
         * ripple width
         * @type {*|jQuery}
         */
        let size = $this.outerWidth();

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
            opacity: 0,
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
                overflow: originalOverflow,
            });

            /**
             * call handler after animation complete
             */
            onComplete();
        });

        return this;
    };
}) (jQuery);

/**
 * document on ready
 */
$(document).ready(() => {
    /**
     * on .waves-effect and [data-waves] click event
     */
    $('.waves-effect, [data-waves]').click(function (event) {
        /**
         * the target element
         * @type {*|jQuery.fn.init|jQuery|HTMLElement}
         */
        const $this = $(this);

        /**
         * ripple background color from data
         * @type {jQuery|jQuery|*|null}
         */
        let backgroundColor = $this.getElementData('waves-background-color', null);

        /**
         * ripple opacity from data
         * @type {jQuery|jQuery|*|null}
         */
        let opacity = $this.getElementData('waves-opacity', null);

        /**
         * ripple animation duration from data
         * @type {number}
         */
        let duration = parseInt($this.getElementData('waves-duration', 800));

        /**
         * ripple complete event from data
         * @type {jQuery|jQuery|*|null}
         */
        let onComplete = $this.getElementData('waves-on-complete', function () {});

        /**
         * calculate clicked position X
         * @type {number}
         */
        let positionX = event.pageX - this.offsetLeft;

        /**
         * calculate clicked position Y
         * @type {number}
         */
        let positionY = event.pageY - this.offsetTop;

        /**
         * execute ripple effect to target
         */
        $this.waveEffect(positionX, positionY, backgroundColor, opacity, duration, onComplete);
    });
});
