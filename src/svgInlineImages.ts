import { FetchLite, fetchLiteFetch } from './fetchLite';
import { inlineImage } from './inlineImage';

/***
 * Inlines the images of an svg element
 * @param svgElement an [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
 * @param fetchLite a fetch or fs.promises.readfile function, used to retrieve the image
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * const svgElement = document.querySelector('svg');
 * const svgText = await svgElementInlineImages(svgElement, fetch);
 * ```
 */
export const svgElementInlineImages = async (
    svgElement: Element,
    fetchLite: FetchLite
): Promise<string> => {
    const clone = svgElement.cloneNode(true) as Element; // https://github.com/microsoft/TypeScript/issues/283

    const images = Array.from(clone.querySelectorAll('image'));

    for (const image of images) {
        await inlineImage(image, fetchLite);
    }

    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    const xml = [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        clone.outerHTML,
    ].join('\n');

    return xml;
};

/***
 * Inlines the images of an svg string
 * @param svgText the text of a .svg file, or the outerHTML of an svg element
 * @param fetchLite a fetch or fs.promises.readfile function, used to retrieve the image
 * @param document
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * svgTextInlineImages('<svg></svg>', fetch, document);
 * ```
 *
 * ```js
 * svgTextInlineImages('<svg></svg>', fs.promises.readfile, myJsDomDocument);
 * ```
 *
 */
export const svgTextInlineImages = async (
    svgText: string,
    fetchLite: FetchLite,
    document: Document
): Promise<string> => {
    const div = document.createElement('div');
    div.innerHTML = svgText;

    const { firstElementChild } = div;

    if (firstElementChild === null) {
        throw new Error(
            `svgTextInlineImages called with svgText containing no elements`
        );
    }

    return svgElementInlineImages(firstElementChild, fetchLite);
};

/***
 * Inlines the images of an svg file
 * @param path the url or path to the svg file
 * @param fetchLite a fetch or fs.promises.readfile function, used to retrieve the svg and image files
 * @param document
 * @returns a promise which resolves to a string containing the svg content with images inlined.
 * @example
 *
 * ```js
 * svgFileInlineImages('myFile.svg', fetch, document);
 * ```
 *
 * ```js
 * svgFileInlineImages('myFile.svg', fs.promises.readfile, myJsDomDocument);
 * ```
 *
 */
export const svgFileInlineImages = async (
    path: string,
    fetchLite: FetchLite,
    document: Document
): Promise<string> => {
    const buffer = await fetchLiteFetch(path, fetchLite);
    return svgTextInlineImages(
        Buffer.from(buffer).toString('utf-8'),
        fetchLite,
        document
    );
};
