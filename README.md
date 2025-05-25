# svg-inline-images

A Scalar Vector Graphics (SVG) document may contain images (via the `<image>` tag), which can point at external image files. In order to make a more portable .svg file, this tool converts them to [data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data) so that the images are embedded inline.

To do this, svg-inline-images requires the Document Object Model (DOM). For headless (nodejs) use, this can be provided by [jsdom](https://www.npmjs.com/package/jsdom). The DOM is unaltered, and the content of a new .svg file is returned as a string.

svg-inline-images has a single production dependency upon the [mime-types](https://www.npmjs.com/package/mime-types) package.

## Installation

```
npm install svg-inline-images
```

## Documentation

<a name="svginlineimagesfunctionssvgelementinlineimagesmd"></a>

### Function: svgElementInlineImages()

> **svgElementInlineImages**(`svgElement`, `fetchLite`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:16](https://github.com/Antony74/svg-inline-images/blob/6dc115bc9612400edf9e97bb1dc7def37f2b02c8/src/svgInlineImages.ts#L16)

Inlines the images of an svg element

#### Parameters

##### svgElement

`Element`

an [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

a fetch or fs.promises.readFile function, used to retrieve the image

#### Returns

`Promise`\<`string`\>

a promise which resolves to a string containing the svg content with images inlined.

#### Example

```js
const svgElement = document.querySelector('svg');
const svgText = await svgElementInlineImages(svgElement, fetch);
```

<a name="svginlineimagesfunctionssvgtextinlineimagesmd"></a>

### Function: svgTextInlineImages()

> **svgTextInlineImages**(`svgText`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:57](https://github.com/Antony74/svg-inline-images/blob/6dc115bc9612400edf9e97bb1dc7def37f2b02c8/src/svgInlineImages.ts#L57)

Inlines the images of an svg string

#### Parameters

##### svgText

`string`

the text of a .svg file, or the outerHTML of an svg element

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

a fetch or fs.promises.readFile function, used to retrieve the image

##### document

`Document`

#### Returns

`Promise`\<`string`\>

a promise which resolves to a string containing the svg content with images inlined.

#### Example

```js
const svgText = await svgTextInlineImages('<svg></svg>', fetch, document);
```

```js
const svgText = await svgTextInlineImages(
    '<svg></svg>',
    fs.promises.readFile,
    myJsDomDocument
);
```

<a name="svginlineimagesfunctionssvgfileinlineimagesmd"></a>

### Function: svgFileInlineImages()

> **svgFileInlineImages**(`path`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:93](https://github.com/Antony74/svg-inline-images/blob/6dc115bc9612400edf9e97bb1dc7def37f2b02c8/src/svgInlineImages.ts#L93)

Inlines the images of an svg file

#### Parameters

##### path

`string`

the url or path to the svg file

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

a fetch or fs.promises.readFile function, used to retrieve the svg and image files

##### document

`Document`

#### Returns

`Promise`\<`string`\>

a promise which resolves to a string containing the svg content with images inlined.

#### Example

```js
const svgText = await svgFileInlineImages(
    'http://example.com/myFile.svg',
    fetch,
    document
);
```

```js
const svgText = await svgFileInlineImages(
    'myFile.svg',
    fs.promises.readFile,
    myJsDomDocument
);
```

<a name="fetchlitetype-aliasesfetchlitemd"></a>

### Type Alias: FetchLite()

> **FetchLite** = (`path`) => `Promise`\<[`FetchLiteResponse`](#fetchlitetype-aliasesfetchliteresponsemd)\>

Defined in: [fetchLite.ts:18](https://github.com/Antony74/svg-inline-images/blob/6dc115bc9612400edf9e97bb1dc7def37f2b02c8/src/fetchLite.ts#L18)

A paired down fetch type compatible with both
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) functions
and [fs.promises.readFile](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)

In browser you would typically literally pass `fetch` as a parameter, in order to use your browser's fetch function.
However, because usually fetch does not support `file://` urls, it may be desirable when working headlessly in nodejs
to pass `fs.promises.readFile` instead. Alternatively, in a nodejs application, it might make sense to use
[node-fetch](https://www.npmjs.com/package/node-fetch) or nodejs's native fetch implementation.
Finally, you could of course provide another/your own implementation of FetchLite.

By requiring fetchLite as a parameter, and providing it, we can ensure the correct dependency is injected
for whatever JavaScript environment we are in.

#### Parameters

##### path

`string`

The url or path of the file we are fetching

#### Returns

`Promise`\<[`FetchLiteResponse`](#fetchlitetype-aliasesfetchliteresponsemd)\>

A promise from which the fetched file can ultimately be obtained as an ArrayBufferLike object

<a name="fetchlitetype-aliasesfetchliteresponsemd"></a>

### Type Alias: FetchLiteResponse

> **FetchLiteResponse** = `Buffer`\<`ArrayBufferLike`\> \| \{ `arrayBuffer`: () => `Promise`\<`ArrayBufferLike`\>; \}

Defined in: [fetchLite.ts:20](https://github.com/Antony74/svg-inline-images/blob/6dc115bc9612400edf9e97bb1dc7def37f2b02c8/src/fetchLite.ts#L20)
