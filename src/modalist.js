/**!
 * @fileOverview modalist.js - A powerful AJAX modal plugin
 * @version 2.0.3
 * @license
 * MIT License
 *
 * Copyright (c) 2018 Jonas Hübotter
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
let elements = [];
class Modalist {

    constructor(options = {}) {
        this._element = options.element || document.querySelector('.modalist');
        delete options.element;
        let defaults = {
            transitionIn: 'fadeIn',
            transitionOut: 'fadeOut'
        };
        this._options = extend( {}, defaults, options );

        elements.push(this);
    }

    get element() {
        return this._element;
    }
    set element(val) {
        this._element = val;
    }

    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
    }

    trigger(element) {
        let url = element.dataset.modalistUrl || element.getAttribute('href') || null,
            form = document.querySelector(element.dataset.modalistForm) || null;

        triggerEvent( document, 'modalist:click', { element: element, url: url, form: form } );

        this.open({
            url: url,
            form: form
        });
    }
    open(options = {}) {
        options = extend( {}, this.options, options );

        this.showOverlay();
        this.hideContent();
        if ( options.form || options.url ) {
            this.showLoader();
            this.load( options.form || options.url, (status, data) => {
                if ( status >= 200 && status < 400 ) {
                    this.render(data);
                } else {
                    this.error( status, data );
                };
                this.hideLoader();
                setTimeout(() => {
                    this.show();
                    this.element.querySelector('.modalist--content').classList.add('modalist--shown');
                    triggerEvent( document, 'modalist:load' );
                }, 350);
            });
        } else {
            this.overflow();
            this.show();
            this.showContent();
            triggerEvent( document, 'modalist:load' );
        };
    }
    overflow() {
        this.element.classList.remove('modalist--overflow');
        if ( this.element.outerHeight + 60 > window.innerHeight )
            this.element.classList.add('modalist--overflow');
    }
    close() {
        triggerEvent( document, 'modalist:close' );
        this.hide();
        this.hideOverlay();
    }

    show() {
        this.element.classList.remove('animated');
        this.element.classList.remove(this.options.transitionOut);
        if ( !this.element.classList.contains('modalist--shown') )
            this.element.classList.add('modalist--shown');
            this.element.classList.add('animated');
            this.element.classList.add(this.options.transitionIn);
    }
    hide() {
        this.element.classList.remove(this.options.transitionIn);
        this.element.classList.add(this.options.transitionOut);
        setTimeout( () => this.element.classList.remove('modalist--shown'), 350 );
    }
    toggle() {
        if (this.element.classList.contains('modalist--shown'))
            this.hide()
        else
            this.show();
    }

    showOverlay() {
        document.querySelector('#modalist--overlay').classList.add('modalist--shown');
    }
    hideOverlay() {
        document.querySelector('#modalist--overlay').classList.remove('modalist--shown');
    }
    toggleOverlay() {
        if (document.querySelector('#modalist--overlay').classList.contains('modalist--shown'))
            this.hideOverlay()
        else
            this.showOverlay();
    }

    showLoader() {
        document.querySelector('#modalist--overlay > .modalist--loader').classList.add('modalist--shown');
    }
    hideLoader() {
        document.querySelector('#modalist--overlay > .modalist--loader').classList.remove('modalist--shown');
    }
    toggleLoader() {
        let loader = this.element.querySelector('.modalist--loader') || document.querySelector('#modalist--overlay > .modalist--loader');
        if (loader.classList.contains('modalist--shown'))
            this.hideLoader()
        else
            this.showLoader();
    }

    showContent() {
        this.element.querySelector('.modalist--content').classList.add('modalist--shown');
    }
    hideContent() {
        this.element.querySelector('.modalist--content').classList.remove('modalist--shown');
    }
    toggleContent() {
        if (this.element.querySelector('.modalist--content').classList.contains('modalist--shown'))
            this.hideLoader()
        else
            this.showLoader();
    }

    load( urlOrForm, callback ) {
        triggerEvent( document, 'modalist:request-start' );

        let request = new XMLHttpRequest();
        if ( typeof urlOrForm == 'string' ) {
            request.open( 'GET', urlOrForm, true );
        } else {
            request.open( urlOrForm.getAttribute('method').toUpperCase, urlOrForm.getAttribute('action'), true );
            request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
        };
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.onload = function() {
            triggerEvent( document, 'modalist:request-end' );
            callback( this.status, this.responseText );
        };
        request.onerror = function() {
            triggerEvent( document, 'modalist:request-end' );
            callback( this.status, this.responseText );
        };
        if ( typeof urlOrForm == 'string' )
            request.send()
        else
            request.send(urlOrForm.serialize);
    }
    render(data) {
        triggerEvent( document, 'modalist:before-render' );
        this.element.querySelector('.modalist--content').innerHTML = data;
        this.overflow();
        triggerEvent( document, 'modalist:render' );
    }
    error( status, response ) {
        console.log(status);
        console.log(response);
        // render error message
    }

    static init() {
        document.querySelectorAll('.modalist--trigger').forEach((element) => {
            // element.removeEventListener( 'click', trigger );
            element.addEventListener( 'click', function trigger(event) {
                event.preventDefault();
                Modalist.find(document.querySelector(this.dataset.modalistElement || '.modalist')).trigger(this);
            });
        });
        document.querySelectorAll('.modalist--closer').forEach((element) => {
            // element.removeEventListener( 'click', close );
            element.addEventListener( 'click', function close() {
                Modalist.find(document.querySelector(this.dataset.modalistElement || '.modalist')).close()
            });
        });
        // document.querySelector('#modalist--overlay').removeEventListener( 'click', close );
        document.querySelector('#modalist--overlay').addEventListener( 'click', function close() {
            elements.forEach(( instance ) => instance.close() );
        });
    }

    static find(element) {
        return elements.filter( ( instance ) => instance.element == element )[0];
    }

}


function triggerEvent( element, name, data = {} ) {
    if (window.CustomEvent) {
        let event = new CustomEvent( name, { detail: data } );
        element.dispatchEvent(event);
    } else {
        let event = document.createEvent('CustomEvent');
        event.initCustomEvent( name, true, true, data );
    };
}
function extend() {
    for ( let i=1; i<arguments.length; i++ )
        for ( let key in arguments[i] )
            if ( arguments[i].hasOwnProperty(key) )
                arguments[0][key] = arguments[i][key];
    return arguments[0];
};

export default Modalist;
