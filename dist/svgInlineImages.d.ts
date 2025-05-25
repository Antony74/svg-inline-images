import { FetchLite } from './fetchLite';
/***
 * Inlines the images of an svg element
 * @param svgElement an [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
 * @param fetchLite a fetch or fs.promises.readFile function, used to retrieve the image
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * const svgElement = document.querySelector('svg');
 * const svgText = await svgElementInlineImages(svgElement, fetch);
 * ```
 */
export declare const svgElementInlineImages: (svgElement: Element, fetchLite: FetchLite) => Promise<string>;
/***
 * Inlines the images of an svg string
 * @param svgText the text of a .svg file, or the outerHTML of an svg element
 * @param fetchLite a fetch or fs.promises.readFile function, used to retrieve the image
 * @param document
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * const svgText = await svgTextInlineImages('<svg></svg>', fetch, document);
 * ```
 *
 * ```js
 * const svgText = await svgTextInlineImages('<svg></svg>', fs.promises.readFile, myJsDomDocument);
 * ```
 *
 */
export declare const svgTextInlineImages: (svgText: string, fetchLite: FetchLite, document: Document) => Promise<string>;
/***
 * Inlines the images of an svg file
 * @param path the url or path to the svg file
 * @param fetchLite a fetch or fs.promises.readFile function, used to retrieve the svg and image files
 * @param document
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * const svgText = await svgFileInlineImages('http://example.com/myFile.svg', fetch, document);
 * ```
 *
 * ```js
 * const svgText = await svgFileInlineImages('myFile.svg', fs.promises.readFile, myJsDomDocument);
 * ```
 *
 */
export declare const svgFileInlineImages: (path: string, fetchLite: FetchLite, document: Document) => Promise<string>;
