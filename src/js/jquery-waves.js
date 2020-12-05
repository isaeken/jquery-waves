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
const rippleContainerSelector = '.wave-effect, .waves-effect, [data-waves]';

/**
 * The ripple element class
 * @type {string}
 */
const rippleClass = 'ie-waves-ripple';

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
     * create rgba from hex
     * @param hex
     * @param alpha
     * @returns {string}
     */
    function hex2rgba(hex, alpha = 1) {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
     * @param autoClose
     * @returns {jQuery}
     */
    $.fn.waveEffect = function (positionX, positionY, backgroundColor = null, opacity = null, duration = 800, onComplete = function () {}, autoClose = true) {
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
         * set ripple opacity '1' if its null
         */
        if (opacity === null) {
            opacity = '1';
        }

        /**
         * set background color is random if its not null and 'RANDOM'
         */
        if (backgroundColor != null && backgroundColor.toUpperCase().trim() === 'RANDOM') {
            backgroundColor = randomColor();
            backgroundColor = hex2rgba(backgroundColor, 0.5);
        }

        /**
         * set duration 800 if its null
         */
        if (duration === null) {
            duration = 800;
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
         * ripple animation options
         * @type {{width: string, height: string}}
         */
        let animateOptions = {
            width: size + 'px',
            height: size + 'px',
        };

        if (autoClose) {
            animateOptions.opacity = 0;
        }

        anime({
            targets: $effect[0],
            duration: duration,
            easing: 'easeInOutQuad',
            width: size + 'px',
            height: size + 'px',
            update: function (animation) {
                $effect.data('ripple-animation-progress', Math.round(animation.progress));
            }
        });

        // $effect.animate(animateOptions, duration, 'linear', function () {
        //     if (autoClose) {
        //         $effect.waveRemove(onComplete);
        //     }
        // });

        return this;
    };

    /**
     * Create ripple in container
     * @param x
     * @param y
     * @param completed
     * @returns {*|Window.jQuery|HTMLElement}
     */
    $.fn.ripple = function (x = null, y = null, completed = () => { }) {

        /**
         * The container
         * @type {*|Window.jQuery|HTMLElement}
         */
        const $this = $(this);

        /**
         * The ripple
         * @type {*|Window.jQuery|HTMLElement}
         */
        const $ripple = $(`<div class="${rippleClass}"></div>`);

        /**
         * Background color of ripple
         * @type {string|null}
         */
        let backgroundColor = $this.getElementData('waves-background-color', null);

        /**
         * Opacity of ripple
         * @type {string|int|float|null}
         */
        let opacity = $this.getElementData('waves-opacity', 1);

        /**
         * Animation duration of ripple
         * @type {number}
         */
        let duration = $this.getElementData('waves-duration', 600);

        /**
         * Check and set x, y variables
         */
        if (x == null) { x = $this.innerWidth() / 2; }
        if (y == null) { y = $this.innerHeight() / 2; }

        /**
         * Check background color is random
         */
        if (typeof backgroundColor === 'string' && backgroundColor.toLowerCase().trim() === 'random')
        {
            backgroundColor = hex2rgba(randomColor(), 0.35);
        }

        /**
         * Set ripple css properties
         */
        $ripple.css({
            top: y,
            left: x,
            backgroundColor: backgroundColor,
            opacity: opacity,
        });

        /**
         * Set container css properties and append ripple
         */
        $this.css({ overflow: 'hidden', position: 'relative' }).append($ripple);

        /**
         * Calculate ripple animated size
         */
        let size = $this.outerWidth(true);
        if ($this.outerWidth(true) < $this.outerHeight(true)) { size = $this.outerHeight(); }
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

            update: function (animation) {
                /**
                 * Set animation progress percentage to ripple
                 */
                $ripple.data('ripple-animation-progress', Math.round(animation.progress));
            },
            complete: function (animation) {
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
                complete: function () {
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
    $.fn.rippleAnimation = function (x = null, y = null) {

        /**
         * The container
         * @type {*|Window.jQuery|HTMLElement}
         */
        const $this = $(this);

        /**
         * The ripple
         */
        const $ripple = $this.wave(x, y, function () {
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

}) (jQuery);

/**
 * document on ready
 */
$(document).ready(() => {

    /**
     * each all ripple containers
     */
    $(rippleContainerSelector).each(function () {

        /**
         * Ripple container
         * @type {*|Window.jQuery|HTMLElement}
         */
        const $this = $(this);

        /**
         * Ripple
         * @type {*|Window.jQuery|HTMLElement}
         */
        let $ripple = null;

        /**
         * Add events to container
         */
        $this
            .on('keyup', () => $this.rippleAnimation())
            .on('touchstart click focus keydown', () => null)
            .on('mousedown', (event) => $ripple = $this.ripple(event.pageX - $this.offset().left, event.pageY - $this.offset().top))
            .on('touchend mouseup mouseleave blur dragleave', (event) => $this.hideRipple($ripple));

    });
});
