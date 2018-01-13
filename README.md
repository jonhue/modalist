# Modalist

![NPM Version](https://img.shields.io/npm/v/modalist.svg)
<img src="https://travis-ci.org/jonhue/modalist.js.svg?branch=master" />

Modalist is a powerful ajaxified modal plugin. Here is how it works:

1) You trigger a modal opening from your frontend code
2) Modalist fetches the modal contents with AJAX
3) The modal opens

Modalist does not reinvent the wheel and uses todays best modal-engine [iziModal.js](https://github.com/dolce/iziModal) to backup its code.

Utilize the [gem](https://github.com/jonhue/modalist) when using modalist.js with Rails.

[**Demo**](https://yaeme.com)

---

## Table of Contents

* [Information](#information)
* [Usage](#usage)
    * [Trigger a modal](#trigger-a-modal)
    * [Modalist functions](#modalist-functions)
    * [Options](#options)
    * [Events](#events)
* [To Do](#to-do)
* [Contributing](#contributing)
    * [Contributors](#contributors)
    * [Semantic Versioning](#semantic-versioning)
* [License](#license)

---

## Information

**Size:** Modalist takes < 1kb gzipped.

**Dependencies:** [jQuery](https://github.com/jquery/jquery), [iziModal.js](https://github.com/dolce/iziModal)

---

## Usage

First make sure to add the necessary HTML markup to your `body` tag:

```html
<div id="modalist"></div>
```

### Trigger a modal

There are numerous ways to trigger/open a modal with Modalist.

One options is to open the modal by calling a JavaScript function - more on that [here](#functions).

#### Links

The most common scenario is using a link to trigger the opening of a modal:

```haml
<a class="modalist--trigger" href="https://jonhue.me/settings/modal">Open modal</a>
```

You can use [data attributes](#options) to pass options customizing the modal.

#### Forms

When you want to open a modal after submitting a form - this is as simple as it gets:

```haml
<form action="https://jonhue.me/settings/modal" method="GET">
<!-- ... -->
<input type="submit" class="modalist--trigger" data-modalist-form="true" />
</form>
```

You can use [data attributes](#options) to pass options customizing the modal.

#### Elements

You can also trigger a modal from any other HTML element in your view:

```haml
<div class="modalist--trigger" data-modalist-url="https://jonhue.me/settings/modal"></div>
```

You can use [data attributes](#options) to pass options customizing the modal.

### Modalist functions

Modalist's JavaScript component provides a set of functions to handle your modals:

#### Open modals

```js
Modalist.open({ url: 'https://jonhue.me/settings/modal' });
```

You can pass [options](#options) to customize the modal:

```js
Modalist.open({
    url: 'https://jonhue.me/settings/modal',
    form: false,
    fullScreen: false
});
```

#### Close modals

```js
Modalist.close();
```

### Options

**`url`:** URL to fetch content of the modal from. Takes a string.

**`form`:** Submit a form and use the response to populate the modal. Takes a string to specify a jQuery selector for the form or `false`.

**`fullScreen`:** Show a full screen modal instead of the default windowed modal. Takes a 'true', `'mobile'` (uses a full screen modal on devices smaller than `800px`) or `false`.

### Events

Modalist emits events that allow you to track the navigation lifecycle and respond to content loading. Modalist fires events on the `$(document)` object.

* `modalist:click` fires when you click a Modalist enabled link to trigger a modal opening. The clicked element is the event target. Access the requested location with `event.data.url`.

* `modalist:request-start` fires before Modalist issues a network request to fetch the modal content.

* `modalist:request-end` fires after the network request completes.

* `modalist:before-render` fires before rendering the content.

* `modalist:render` fires after Modalist renders the content in the modal.

* `modalist:load` fires after Modalist completed preparing and opened the modal.

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
