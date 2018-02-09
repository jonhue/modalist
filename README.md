# Modalist

![NPM Version](https://img.shields.io/npm/v/modalist.svg)
<img src="https://travis-ci.org/jonhue/modalist.js.svg?branch=master" />

Modalist is a powerful & lightweight (not necessarily but primarily ajaxified) modal plugin. Here is how it works:

1) You create a distinct Modalist object for every modal style.
2) You trigger a modal from your frontend code passing custom parameters
3) Modalist fetches the modal contents with AJAX while showing a loader (skippable if not desired)
4) The modal opens

[**Demo**](https://yaeme.com)

#### Extensions

* [Ruby on Rails](https://github.com/jonhue/modalist)

---

## Table of Contents

* [Information](#information)
* [Usage](#usage)
    * [Trigger a modal](#trigger-a-modal)
        * [Asynchronous (AJAX)](#asynchronous-ajax)
        * [Synchronous](#synchronous)
    * [Close a modal](#close-a-modal)
    * [Functions](#functions)
    * [Options](#options)
        * [Instance](#instance)
        * [Trigger](#trigger)
    * [Events](#events)
    * [Advanced](#advanced)
        * [Multiple modals](#multiple-modals)
        * [Fullscreen modals](#fullscreen-modals)
        * [Custom styles](#custom-styles)
* [To Do](#to-do)
* [Contributing](#contributing)
    * [Contributors](#contributors)
    * [Semantic Versioning](#semantic-versioning)
* [License](#license)

---

## Information

**Size:** Modalist takes < 1kb gzipped.

**Dependencies:** [Animate.css](https://github.com/daneden/animate.css)

---

## Usage

First make sure to add the necessary HTML markup to your `body` tag:

```javascript
import Modalist from 'modalist';
document.addEventListener( 'modalist:render', () => Modalist.init() );
let modalist = new Modalist;
```

```sass
@import "animate.css"
@import "modalist/src/modalist"
@import "modalist/src/modalist-theme"
```

```html
<div id="modalist--overlay">
    <div class="modalist--loader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)"><g class="nc-loop_bars-rotate-24" transform="rotate(270 12 12)"> <rect x="11" fill="#444444" width="2" height="6"></rect> <rect x="17.3639603" y="2.636039" transform="matrix(0.7071068 0.7071068 -0.7071068 0.7071068 9.3639612 -11.3345242)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="18" y="11" fill="#444444" width="6" height="2" style="opacity: 0.4;"></rect> <rect x="17.3639603" y="15.3639612" transform="matrix(-0.7071068 0.7071068 -0.7071068 -0.7071068 44.3345222 18.3639603)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="11" y="18" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="4.6360388" y="15.3639612" transform="matrix(-0.7071068 -0.7071068 0.7071068 -0.7071068 -3.363961 35.3345222)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="0" y="11" fill="#444444" width="6" height="2" style="opacity: 0.5;"></rect> <rect x="4.6360388" y="2.636039" transform="matrix(0.7071068 -0.7071068 0.7071068 0.7071068 -2.3345237 5.6360388)" fill="#444444" width="2" height="6" style="opacity: 0.8;"></rect> </g> <script>!function(){function t(t){this.element=t,this.animationId,this.start=null,this.init()}if(!window.requestAnimationFrame){var i=null;window.requestAnimationFrame=function(t,n){var e=(new Date).getTime();i||(i=e);var a=Math.max(0,16-(e-i)),o=window.setTimeout(function(){t(e+a)},a);return i=e+a,o}}t.prototype.init=function(){var t=this;this.animationId=window.requestAnimationFrame(t.triggerAnimation.bind(t))},t.prototype.reset=function(){var t=this;window.cancelAnimationFrame(t.animationId)},t.prototype.triggerAnimation=function(t){var i=this;this.start||(this.start=t);var n=t-this.start;800&gt;n||(this.start=this.start+800),this.element.setAttribute("transform","rotate("+parseInt(Math.min(n/100,8))%8*45+" 12 12)");if(document.documentElement.contains(this.element))window.requestAnimationFrame(i.triggerAnimation.bind(i))};var n=document.getElementsByClassName("nc-loop_bars-rotate-24"),e=[];if(n)for(var a=0;n.length&gt;a;a++)!function(i){e.push(new t(n[i]))}(a);document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState?e.forEach(function(t){t.reset()}):e.forEach(function(t){t.init()})})}();</script></g></svg>
    </div>
</div>
<div class="modalist">
    <div class="modalist--loader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)"><g class="nc-loop_bars-rotate-24" transform="rotate(270 12 12)"> <rect x="11" fill="#444444" width="2" height="6"></rect> <rect x="17.3639603" y="2.636039" transform="matrix(0.7071068 0.7071068 -0.7071068 0.7071068 9.3639612 -11.3345242)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="18" y="11" fill="#444444" width="6" height="2" style="opacity: 0.4;"></rect> <rect x="17.3639603" y="15.3639612" transform="matrix(-0.7071068 0.7071068 -0.7071068 -0.7071068 44.3345222 18.3639603)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="11" y="18" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="4.6360388" y="15.3639612" transform="matrix(-0.7071068 -0.7071068 0.7071068 -0.7071068 -3.363961 35.3345222)" fill="#444444" width="2" height="6" style="opacity: 0.4;"></rect> <rect x="0" y="11" fill="#444444" width="6" height="2" style="opacity: 0.5;"></rect> <rect x="4.6360388" y="2.636039" transform="matrix(0.7071068 -0.7071068 0.7071068 0.7071068 -2.3345237 5.6360388)" fill="#444444" width="2" height="6" style="opacity: 0.8;"></rect> </g> <script>!function(){function t(t){this.element=t,this.animationId,this.start=null,this.init()}if(!window.requestAnimationFrame){var i=null;window.requestAnimationFrame=function(t,n){var e=(new Date).getTime();i||(i=e);var a=Math.max(0,16-(e-i)),o=window.setTimeout(function(){t(e+a)},a);return i=e+a,o}}t.prototype.init=function(){var t=this;this.animationId=window.requestAnimationFrame(t.triggerAnimation.bind(t))},t.prototype.reset=function(){var t=this;window.cancelAnimationFrame(t.animationId)},t.prototype.triggerAnimation=function(t){var i=this;this.start||(this.start=t);var n=t-this.start;800&gt;n||(this.start=this.start+800),this.element.setAttribute("transform","rotate("+parseInt(Math.min(n/100,8))%8*45+" 12 12)");if(document.documentElement.contains(this.element))window.requestAnimationFrame(i.triggerAnimation.bind(i))};var n=document.getElementsByClassName("nc-loop_bars-rotate-24"),e=[];if(n)for(var a=0;n.length&gt;a;a++)!function(i){e.push(new t(n[i]))}(a);document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState?e.forEach(function(t){t.reset()}):e.forEach(function(t){t.init()})})}();</script></g></svg>
    </div>
    <div class="modalist--content"></div>
</div>
```

### Trigger a modal

Let's see how to trigger modals from your HTML markup.

Learn more about opening modals from JavaScript [here](#functions).

#### Asynchronous (AJAX)

Load modal contents from a source.

##### Links

The most common scenario is using a link to trigger the asynchronous opening of a modal:

```html
<a class="modalist--trigger" href="https://jonhue.me/settings/modal">Open modal</a>
```

You can use [data attributes](#trigger) to pass options customizing the modal.

##### Forms

When you want to open a modal after submitting a form - this is as simple as it gets:

```html
<form id="modalist-form" action="https://jonhue.me/settings/modal" method="GET">
<!-- ... -->
<input type="submit" class="modalist--trigger" data-modalist-form="form#modalist-form" />
</form>
```

You can use [data attributes](#trigger) to pass options customizing the modal.

##### Elements

You can also trigger a modal from any other HTML element in your view:

```html
<div class="modalist--trigger" data-modalist-url="https://jonhue.me/settings/modal"></div>
```

You can use [data attributes](#trigger) to pass options customizing the modal.

#### Synchronous

Use HTML markup inside `.modalist--content` as modal content by omitting `href`, `data-modalist-url` and `data-modalist-form` attributes.

```html
<div class="modalist--trigger"></div>
```

### Close a modal

Just add the class `modalist--closer` to an element. Whenever the element is the target of a click, the modal will close.

**Note:** Be aware that adding this class to a hyperlink or form submit button will not prevent default behavior.

### Functions

```javascript
let modalist = new Modalist;

// Open modal synchronously
modalist.open();

// Open modal asynchronously with a GET request
modalist.open({ url: 'https://jonhue.me/settings/modal' });

// Open modal asynchronously by submitting a form
modalist.open({ form: document.querySelector('form#modalist-form') });

// Close modal
modalist.close();
```

### Options

#### Instance

Options specified when creating a new instance from the `Modalist` class:

```javascript
let modalist = new Modalist({ transitionIn: 'fadeIn' });
```

* `transitionIn` Set the [Animate.css](https://github.com/daneden/animate.css) animation name used to open a modal. Accepts a string. Defaults to `fadeIn`.
* `transitionOut` Set the [Animate.css](https://github.com/daneden/animate.css) animation name used to close a modal. Accepts a string. Defaults to `fadeOut`.
* `element` Modal element node used for handling [multiple-modals](#multiple-modals). Accepts a node. Defaults to `document.querySelector('.modalist')`.

#### Trigger

Options specified when opening a modal instance. Can be either passed as an options hash or specified as data attributes with `data-modalist-` as prefix:

* `url` URL to fetch modal content from. Takes a string.
* `form` Submit a form and use the response to populate the modal. Takes a string to specify a selector for the form element.
* `element` Modal query selector used for handling [multiple-modals](#multiple-modals). Accepts a query selector (string). Defaults to `'.modalist'`. Can only be used as a data attribute.

### Events

Modalist emits events that allow you to track the navigation lifecycle and respond to content loading. Modalist fires events on the `document` object.

* `modalist:click` fires when you click a Modalist enabled element to trigger a modal opening. Access the clicked element with `event.data.element`. Access the requested location with `event.data.url` or the form element to be submitted with `event.data.form`.

* `modalist:request-start` fires before Modalist issues a network request to fetch the modal content.

* `modalist:request-end` fires after the network request completes.

* `modalist:before-render` fires before rendering the content.

* `modalist:render` fires after Modalist renders the content in the modal.

* `modalist:load` fires after Modalist completed preparing the modal and started opening it.

* `modalist:close` fires before Modalist closes the modal.

### Advanced

#### Multiple modals

Modalist allows you to use multiple elements as modals:

```javascript
let firstModal = new Modalist({ element: document.querySelector('#first-modal') });
let secondModal = new Modalist({ element: document.querySelector('#second-modal') });
```

```html
<div id="first-modal">
    <!-- ... -->
</div>
<div id="second-modal">
    <!-- ... -->
</div>
```

Now just use the instance to call Modalist functions. You can specify the `data-modalist-element` attribute on you trigger elements to be able to trigger a specific modal directly from your HTML markup:

```html
<a class="modalist--trigger" href="https://jonhue.me/settings/modal" data-modalist-element="#first-modal">Open first modal</a>
```

#### Fullscreen modals

You are able to add the `modalist--full-screen` class to your modals to make them full screen.

#### Custom styles

You can include a custom version of the Modalist [theme](src/modalist-theme.sass) in your project. Customizing the main styles is not advised.

---

## To Do

[Here](https://github.com/jonhue/modalist.js/projects/1) is the full list of current projects.

To propose your ideas, initiate the discussion by adding a [new issue](https://github.com/jonhue/modalist.js/issues/new).

---

## Contributing

We hope that you will consider contributing to Modalist. Please read this short overview for some information about how to get started:

[Learn more about contributing to this repository](CONTRIBUTING.md), [Code of Conduct](CODE_OF_CONDUCT.md)

### Contributors

Give the people some :heart: who are working on this project. See them all at:

https://github.com/jonhue/modalist.js/graphs/contributors

### Semantic Versioning

Modalist follows Semantic Versioning 2.0 as defined at http://semver.org.

## License

MIT License

Copyright (c) 2017 Jonas Hübotter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
