import { FetchLite, fetchLiteFetch } from './fetchLite';
import { inlineImage } from './inlineImage';

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
