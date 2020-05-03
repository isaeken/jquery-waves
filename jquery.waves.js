/**
 *     @author İsa Eken <hello@isaeken.com.tr>
 *     @website https://isaeken.com.tr
 *     @github https://github.com/isaeken
 *     @name jquery.waves
 */

if (!window.jQuery) console.error('Waves required jQuery.')
else
{
    (function ($) {
        $.fn._wave = function (x, y, _color = null, _opacity = null, _duration = 800, _handler) {
            if (!$(this).hasClass('waves-effect')) console.error('waves class required.')
            else
            {
                var $wave = $('<div class="ie-waves-effect"></div>')

                if (y < 0) y = $(this).innerWidth() / 2;
                if (x < 0) x = $(this).innerHeight() / 2;

                if (_color === 'RANDOM') {
                    var letters = '0123456789ABCDEF'
                    var color = '#'
                    for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
                    _color = color
                }

                $wave
                    .css('top', y)
                    .css('left', x)

                if (_color !== null) $wave.css('background-color', _color)
                if (_opacity !== null) $wave.css('opacity', _opacity)

                $(this).append($wave)

                var wave_size = $(this).outerWidth()
                if ($(this).outerWidth() < $(this).outerHeight())
                    wave_size = $(this).outerHeight()

                $wave.animate({
                    width: (wave_size * 2 + 50) + 'px',
                    height: (wave_size * 2 + 50) + 'px',
                    opacity: 0,
                }, _duration, function () {
                    $wave.remove()
                    _handler()
                })
            }
            return this;
        };
    }) (jQuery)

    $(document).ready(() => {
        $('.waves-effect').each(function () {
            $(this).click(function (event) {
                var _color = null;
                var _opacity = null;
                var _duration = 800;
                var _handler = function () { };

                if ($(this).hasClass('waves-rainbow')) _color = 'RANDOM'
                if ($(this).hasClass('waves-fast')) _duration = 500
                if ($(this).hasClass('waves-slow')) _duration = 1800
                if ($(this).attr('waves-color') !== undefined) _color = $(this).attr('waves-color')
                if ($(this).attr('waves-duration') !== undefined) _duration = parseInt($(this).attr('waves-duration'))

                $(this)._wave(
                    event.pageX - this.offsetLeft,
                    event.pageY - this.offsetTop,
                    _color,
                    _opacity,
                    _duration,
                    _handler
                )
            })
        });
    });
}
