
## Installation
### CSS

```html
<head>
    ...
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@dgtdept/rachana/css/cgds.css"
    />
    ...
</head>
```

### Vanilla JavaScript

Rachana components makes use of [bootstrap v5.1.3 js library](https://getbootstrap.com/docs/5.1/getting-started/javascript/) as an external dependency.


>`@dgtdept/rachana` uses `bootstrap-icons` for certain components like Form but it is not ship with it. Install `bootstrap-icons` or use CDN if you need it. Please refer to [bootstrap-icons](bootstrap-icons) for usage instructions.

```html
<head>
  ...
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dgtdept/rachana/css/cgds.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
  ...
</head>

<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    crossorigin="anonymous"></script>
</body>
```

For more information, please refer to the [components documentation](https://www.rachana.gov.kh/components).

### Via NPM

```sh
$ npm i @dgtdept/rachana bootstrap-icons
```

### For Webpack

```js
//importing css
import "@dgtdept/rachana/css/cgds.css";

import '@popperjs/core';
import * as bootstrap from 'bootstrap';
```


## Patch Notes

See [Changelog](./CHANGELOG.md)
