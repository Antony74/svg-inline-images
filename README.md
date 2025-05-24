# svg-inline-images

A Scalar Vector Graphics (SVG) document may contain images (via the `<image>` tag), which can point at external image files.  In order to make a more portable .svg file, this tool converts them to [data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data) so that the images are embedded inline.

To do this, svg-inline-images requires the Document Object Model (DOM).  For headless (nodejs) use, this can be provided by [jsdom](https://www.npmjs.com/package/jsdom).  The DOM is unaltered, and the content of a new .svg file is returned as a string.

svg-inline-images has a single production dependency upon the [mime-types](https://www.npmjs.com/package/mime-types) package.

## Documentation

<a name="svginlineimagesfunctionssvgelementinlineimagesmd"></a>

### Function: svgElementInlineImages()

> **svgElementInlineImages**(`svgElement`, `fetchLite`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:10](https://github.com/Antony74/svg-inline-images/blob/495c6248ab84bfb68fe88a617ec4040f5b3729fd/src/svgInlineImages.ts#L10)

Inlines the images of an svg element

#### Parameters

##### svgElement

`Element`

an [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

a fetch or fs.promises.readfile function, used to retrieve the image

#### Returns

`Promise`\<`string`\>

a promise which resolves to a string containing the svg content with images inlined.


<a name="svginlineimagesfunctionssvgtextinlineimagesmd"></a>

### Function: svgTextInlineImages()

> **svgTextInlineImages**(`svgText`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:34](https://github.com/Antony74/svg-inline-images/blob/495c6248ab84bfb68fe88a617ec4040f5b3729fd/src/svgInlineImages.ts#L34)

#### Parameters

##### svgText

`string`

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

##### document

`Document`

#### Returns

`Promise`\<`string`\>


<a name="svginlineimagesfunctionssvgfileinlineimagesmd"></a>

### Function: svgFileInlineImages()

> **svgFileInlineImages**(`path`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:53](https://github.com/Antony74/svg-inline-images/blob/495c6248ab84bfb68fe88a617ec4040f5b3729fd/src/svgInlineImages.ts#L53)

#### Parameters

##### path

`string`

##### fetchLite

[`FetchLite`](#fetchlitetype-aliasesfetchlitemd)

##### document

`Document`

#### Returns

`Promise`\<`string`\>


<a name="fetchlitetype-aliasesfetchliteresponsemd"></a>

### Type Alias: FetchLiteResponse

> **FetchLiteResponse** = `ArrayBufferLike` \| \{ `arrayBuffer`: () => `Promise`\<`ArrayBufferLike`\>; \}

Defined in: [fetchLite.ts:1](https://github.com/Antony74/svg-inline-images/blob/495c6248ab84bfb68fe88a617ec4040f5b3729fd/src/fetchLite.ts#L1)


<a name="fetchlitetype-aliasesfetchlitemd"></a>

### Type Alias: FetchLite()

> **FetchLite** = (`path`) => `Promise`\<[`FetchLiteResponse`](#fetchlitetype-aliasesfetchliteresponsemd)\>

Defined in: [fetchLite.ts:5](https://github.com/Antony74/svg-inline-images/blob/495c6248ab84bfb68fe88a617ec4040f5b3729fd/src/fetchLite.ts#L5)

#### Parameters

##### path

`string`

#### Returns

`Promise`\<[`FetchLiteResponse`](#fetchlitetype-aliasesfetchliteresponsemd)\>
