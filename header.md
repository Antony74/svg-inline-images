# svg-inline-images

A Scalar Vector Graphics (SVG) document may contain images (via the `<image>` tag), which can point at external image files.  In order to make a more portable .svg file, this tool converts them to [data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data) so that the images are embedded inline.

To do this, svg-inline-images requires the Document Object Model (DOM).  For headless (nodejs) use, this can be provided by [jsdom](https://www.npmjs.com/package/jsdom).  The DOM is unaltered, and the content of a new .svg file is returned as a string.

svg-inline-images has a single production dependency upon the [mime-types](https://www.npmjs.com/package/mime-types) package.

## Installation

```
npm install svg-inline-images
```

## Documentation
