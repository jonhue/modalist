/**!
 * @fileOverview modalist.js - A powerful AJAX modal plugin extending iziModal
 * @version 1.0.5
 * @license
 * MIT License
 *
 * Copyright (c) 2017 Jonas Hübotter
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var Modalist;
$(document).on( 'ready turbolinks:load', function() {
    Modalist = new function() {

        this.modal = $('#modalist');
        this.iziModal = $(this.modal).iziModal();

        $('.modalist--trigger').off('click');
        $('.modalist--trigger').on( 'click', function(event) {

            event.preventDefault();

            var e = jQuery.Event('modalist:click'),
                url = $(this).data('modalist-url') || $(this).attr('href'),
                form = $(this).data('modalist-form') || false,
                fullScreen = $(this).data('modalist-full-screen');

            e.target = $(this);
            e.data = { url: url };
            $(document).trigger(e);

            Modalist.reset();
            Modalist.fullScreen(fullScreen);
            Modalist.load( url, {
                form: form
            });

        });

        this.open = function(options) {

            var defaults = {
                url: null,
                form: false,
                fullScreen: false
            };
            options = $.extend( defaults, options );

            Modalist.reset();
            Modalist.fullScreen(options.fullScreen);
            Modalist.load( options.url, {
                form: options.form
            });

        };

        this.close = function() {
            $(Modalist.modal).iziModal('close');
        };

        this.reset = function() {
            $(Modalist.modal).iziModal('setTransitionIn', 'comingIn');
            $(Modalist.modal).iziModal('setTransitionOut', 'comingOut');
            $(Modalist.modal).data('full-screen', false);
            $(Modalist.modal).iziModal('setTop', 'auto');
            $(Modalist.modal).iziModal('setBottom', 'auto');
        };

        this.fullScreen = function(fullScreen) {
            if ( fullScreen == 'true' || ( fullScreen == 'mobile' && $(window).width() <= 800 ) ) {
                $(Modalist.modal).iziModal('setTransitionIn', 'fadeInRight');
                $(Modalist.modal).iziModal('setTransitionOut', 'fadeOutRight');
                $(Modalist.modal).data('full-screen', true);
            };
        };

        this.load = function( url, options ) {

            var defaults = {
                form: false
            };
            options = $.extend( defaults, options );

            $(document).trigger('modalist:request-start');

            if (options.form) {
                $.ajax({
                    url: $(options.form).attr('action'),
                    type: $(options.form).attr('method'),
                    data : $(options.form).serialize(),
                    success: function(data) {
                        $(document).trigger('modalist:request-end');
                        Modalist.data(data);
                    }
                });
            } else {
                $.get( url, function(data) {
                    $(document).trigger('modalist:request-end');
                    Modalist.data(data);
                });
            };

        };

        this.data = function(data) {

            $(document).trigger('modalist:before-render');
            $(Modalist.modal).find('.iziModal-content').html(data);
            $(document).trigger('modalist:render');

            $(Modalist.modal).iziModal('open');
            if ( $(Modalist.modal).height() + 60 > $(window).height() ) {
                $(Modalist.modal).iziModal('setTop', 30);
                $(Modalist.modal).iziModal('setBottom', 30);
            };
            $(document).trigger('modalist:load');

        };

    };
});
