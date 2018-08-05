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
            form: form,
            modalIsAlreadyOpen: isDescendant( this.element, element )
        });
    }
    open(options = {}) {
        options = extend( {}, this.options, options );

        if (options.modalIsAlreadyOpen) {
            this.hideInnerContent();
        } else {
            this.showOverlay();
            this.hideContent();
        }
        if ( options.form || options.url ) {
            if (!options.modalIsAlreadyOpen)
                this.showLoader();
            this.load( options.form || options.url, (status, data) => {
                if ( status >= 200 && status < 400 ) {
                    this.render( data, { modalIsAlreadyOpen: options.modalIsAlreadyOpen } );
                } else {
                    this.error( status, data );
                };
                if (options.modalIsAlreadyOpen) {
                    triggerEvent( document, 'modalist:load' );
                } else {
                    this.hideLoader();
                    setTimeout(() => {
                        this.show();
                        this.showContent();
                        triggerEvent( document, 'modalist:load' );
                    }, 350);
                }
            });
        } else {
            this.overflow();
            if (options.modalIsAlreadyOpen) {
                this.showInnerContent();
            } else {
                this.show();
                this.showContent();
            }
            triggerEvent( document, 'modalist:load' );
        }
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
            this.hideContent()
        else
            this.showContent();
    }

    showInnerContent() {
        Array.from(this.element.querySelector('.modalist--content').children).forEach( (element) => {
            element.classList.add('animated');
            element.classList.add('fadeIn');
            element.classList.remove('fadeOut');
            element.classList.remove('hidden');
        });
    }
    hideInnerContent() {
        Array.from(this.element.querySelector('.modalist--content').children).forEach( (element) => {
            element.classList.add('animated');
            element.classList.add('fadeOut');
            element.classList.remove('fadeIn');
        });
    }
    toggleInnerContent() {
        if (this.element.querySelector('.modalist--content').classList.contains('modalist--shown'))
            this.hideInnerContent()
        else
            this.showInnerContent();
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
    render( data, options = {} ) {
        triggerEvent( document, 'modalist:before-render' );
        this.element.querySelector('.modalist--content').innerHTML = data;
        if (options.modalIsAlreadyOpen) {
            Array.from(this.element.querySelector('.modalist--content').children).forEach( (element) => element.classList.add('hidden') );
            this.showInnerContent();
        }
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
            element.removeEventListener( 'click', trigger );
            element.addEventListener( 'click', trigger );
        });
        function trigger() {
            event.preventDefault();
            Modalist.find(document.querySelector(this.dataset.modalistElement || '.modalist')).trigger(this);
        };
        document.querySelectorAll('.modalist--closer').forEach((element) => {
            element.removeEventListener( 'click', closeModal );
            element.addEventListener( 'click', closeModal );
        });
        function closeModal() {
            Modalist.find(document.querySelector(this.dataset.modalistElement || '.modalist')).close()
        }
        document.querySelector('#modalist--overlay').removeEventListener( 'click', closeOverlay );
        document.querySelector('#modalist--overlay').addEventListener( 'click', closeOverlay );
        function closeOverlay() {
            elements.forEach(( instance ) => instance.close() );
        };
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
}
function isDescendant( parent, child ) {
     var node = child.parentNode;
     while ( node != null ) {
         if ( node == parent ) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

export default Modalist;
