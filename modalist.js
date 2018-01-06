/**!
 * @fileOverview modalist.js - A powerful AJAX modal plugin extending iziModal
 * @version 1.0.1
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
(function($) {
    Modalist = new function(options) {

        var defaults = {
            iziModal: {}
        };
        options = $.extend( defaults, options );

        this.modal = $('#modalist');
        // this.iziModal = $(this.modal).iziModal(options.iziModal);
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

            this.reset();
            this.fullScreen(fullScreen);
            this.load( url, form );

        });

        this.open = function(options) {

            var defaults = {
                url: null,
                form: false,
                fullScreen: false
            };
            options = $.extend( defaults, options );

            this.reset();
            this.fullScreen(options.fullScreen);
            this.load( options.url, options.form );

        };

        this.close = function() {
            $(this.modal).iziModal('close');
        };

        this.reset = function() {
            $(this.modal).iziModal('setTransitionIn', 'comingIn');
            $(this.modal).iziModal('setTransitionOut', 'comingOut');
            $(this.modal).data('full-screen', false);
            $(this.modal).iziModal('setTop', 'auto');
            $(this.modal).iziModal('setBottom', 'auto');
        };

        this.fullScreen = function(fullScreen) {
            if ( fullScreen == 'true' || ( fullScreen == 'mobile' && $(window).width() <= 800 ) ) {
                $(this.modal).iziModal('setTransitionIn', 'fadeInRight');
                $(this.modal).iziModal('setTransitionOut', 'fadeOutRight');
                $(this.modal).data('full-screen', true);
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
                    type: 'GET',
                    data : $(options.form).serialize(),
                    success: function(data) {
                        $(document).trigger('modalist:request-end');
                        this.data(data);
                    }
                });
            } else {
                $.get( url, function(data) {
                    $(document).trigger('modalist:request-end');
                    this.data(data);
                });
            };

        };

        this.data = function(data) {

            $(document).trigger('modalist:before-render');
            $(this.modal).find('.iziModal-content').html(data);
            $(document).trigger('modal:render');

            $(this.modal).iziModal('open');
            if ( $(this.modal).height() + 60 > $(window).height() ) {
                $(this.modal).iziModal('setTop', 30);
                $(this.modal).iziModal('setBottom', 30);
            };
            $(document).trigger('modalist:load');

        };

    };
})(jQuery);
