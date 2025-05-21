
<a name="headermd"></a>

# svg-inline-images


<a name="docssvginlineimagesfunctionssvgelementinlineimagesmd"></a>

# Function: svgElementInlineImages()

> **svgElementInlineImages**(`svgElement`, `fetchLite`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:4](https://github.com/Antony74/svg-inline-images/blob/93f6bdda63eb902904faea9c55b68b01719dbdd5/src/svgInlineImages.ts#L4)

## Parameters

### svgElement

`Element`

### fetchLite

[`FetchLite`](#docsfetchlitetype-aliasesfetchlitemd)

## Returns

`Promise`\<`string`\>


<a name="docssvginlineimagesfunctionssvgtextinlineimagesmd"></a>

# Function: svgTextInlineImages()

> **svgTextInlineImages**(`svgText`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:28](https://github.com/Antony74/svg-inline-images/blob/93f6bdda63eb902904faea9c55b68b01719dbdd5/src/svgInlineImages.ts#L28)

## Parameters

### svgText

`string`

### fetchLite

[`FetchLite`](#docsfetchlitetype-aliasesfetchlitemd)

### document

`Document`

## Returns

`Promise`\<`string`\>


<a name="docssvginlineimagesfunctionssvgfileinlineimagesmd"></a>

# Function: svgFileInlineImages()

> **svgFileInlineImages**(`path`, `fetchLite`, `document`): `Promise`\<`string`\>

Defined in: [svgInlineImages.ts:47](https://github.com/Antony74/svg-inline-images/blob/93f6bdda63eb902904faea9c55b68b01719dbdd5/src/svgInlineImages.ts#L47)

## Parameters

### path

`string`

### fetchLite

[`FetchLite`](#docsfetchlitetype-aliasesfetchlitemd)

### document

`Document`

## Returns

`Promise`\<`string`\>


<a name="docsfetchlitetype-aliasesfetchliteresponsemd"></a>

# Type Alias: FetchLiteResponse

> **FetchLiteResponse** = `ArrayBufferLike` \| \{ `arrayBuffer`: () => `Promise`\<`ArrayBufferLike`\>; \}

Defined in: [fetchLite.ts:1](https://github.com/Antony74/svg-inline-images/blob/93f6bdda63eb902904faea9c55b68b01719dbdd5/src/fetchLite.ts#L1)


<a name="docsfetchlitetype-aliasesfetchlitemd"></a>

# Type Alias: FetchLite()

> **FetchLite** = (`path`) => `Promise`\<[`FetchLiteResponse`](#docsfetchlitetype-aliasesfetchliteresponsemd)\>

Defined in: [fetchLite.ts:5](https://github.com/Antony74/svg-inline-images/blob/93f6bdda63eb902904faea9c55b68b01719dbdd5/src/fetchLite.ts#L5)

## Parameters

### path

`string`

## Returns

`Promise`\<[`FetchLiteResponse`](#docsfetchlitetype-aliasesfetchliteresponsemd)\>
