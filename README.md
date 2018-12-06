# Modalist

![NPM Version](https://img.shields.io/npm/v/modalist.svg) ![Travis](https://travis-ci.org/jonhue/modalist.svg?branch=master)

Modalist is a powerful & lightweight (asynchronous) modal plugin. Here is how it works:

1) You create a distinct Modalist object for every modal style.
2) You trigger a modal from your frontend code passing custom parameters
3) Modalist fetches the modal contents asynchronously while showing a loader (skippable if not desired)
4) The modal opens

#### Extensions

* [Ruby on Rails](https://github.com/jonhue/modalist-ruby)

[**Demo**](https://jonhue.github.io/modalist)

---

## Table of Contents

* [Usage](#usage)
  * [Trigger a modal](#trigger-a-modal)
    * [Asynchronous](#asynchronous)
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
* [To do](#to-do)
* [Contributing](#contributing)
  * [Semantic Versioning](#semantic-versioning)

---

## Usage

First make sure to add the necessary HTML markup to your `body` tag:

```javascript
import Modalist from 'modalist';

document.addEventListener('DOMContentLoaded', () => Modalist.init());
document.addEventListener('modalist:render', () => Modalist.init());
let modalist = new Modalist;
```

```scss
@import "animate.css";
@import "modalist/src/modalist";
@import "modalist/src/themes/default";
```

```html
<div class="modalist--overlay">
  <div class="modalist--loader">
    <img src="loader.png" alt="loader" />
  </div>
</div>
<div class="modalist">
  <div class="modalist--content"></div>
</div>
```

### Trigger a modal

Let's see how to trigger modals from your HTML markup.

Learn more about opening modals from JavaScript [here](#functions).

#### Asynchronous

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
<div class="modalist" id="first-modal">
    <!-- ... -->
</div>
<div class="modalist" id="second-modal">
    <!-- ... -->
</div>
```

**Note:** You only need to add the `modalist--overlay` element once.

Now just use the instance to call Modalist functions. You can specify the `data-modalist-element` attribute on you trigger elements to be able to trigger a specific modal directly from your HTML markup:

```html
<a class="modalist--trigger" href="https://jonhue.me/settings/modal" data-modalist-element="#first-modal">Open first modal</a>
```

#### Fullscreen modals

Add the `modalist--full-screen` class to your modals to make them full screen.

#### Custom styles

You can include a custom version of the [default Modalist theme](src/themes/_default.sass) in your project. Customizing the main styles is not advised.

---

## To do

We use [GitHub projects](https://github.com/jonhue/modalist/projects/1) to coordinate the work on this project.

To propose your ideas, initiate the discussion by adding a [new issue](https://github.com/jonhue/modalist/issues/new).

---

## Contributing

We hope that you will consider contributing to Modalist. Please read this short overview for some information about how to get started:

[Learn more about contributing to this repository](CONTRIBUTING.md), [Code of Conduct](CODE_OF_CONDUCT.md)

### Semantic Versioning

Modalist follows Semantic Versioning 2.0 as defined at http://semver.org.
