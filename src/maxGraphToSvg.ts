import { FileLoader, inlineImage } from './inlineImage';

export type MaxGraphToSvgOptions = {
    inlineImages?: boolean;
};

export const svgInlineImages = async (
    svg: Element,
    fileLoader: FileLoader,
): Promise<string> => {
    if (!(svg instanceof SVGElement)) {
        throw new Error(
            `svgInlineImages was passed an element which is an SVGElement`,
        );
    }

    const clone = svg.cloneNode(true) as typeof svg; // https://github.com/microsoft/TypeScript/issues/283

    const images = Array.from(clone.querySelectorAll('image'));

    for (const image of images) {
        await inlineImage(image, fileLoader);
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

export const svgTextInlineImages = async () => {}
