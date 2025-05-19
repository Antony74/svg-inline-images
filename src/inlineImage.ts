import fs from 'fs';
import mime from 'mime-types';

export type FileLoader =
    | { fetch: typeof fetch; readFile: undefined }
    | { readFile: typeof fs.promises.readFile; fetch: undefined };

export const inlineImage = async (
    image: SVGImageElement,
    fileLoader: FileLoader,
): Promise<void> => {
    const path = image.getAttribute('xlink:href') ?? '';

    let buffer: ArrayBufferLike;

    if (fileLoader.fetch) {
        const response = await fileLoader.fetch(path);
        buffer = await response.arrayBuffer();
    } else {
        buffer = await fileLoader.readFile(path);
    }

    const content = Buffer.from(buffer).toString('base64');

    const mimeType = mime.lookup(path);
    const contentType = mimeType ? mimeType : '';

    const newUrl = `data:${contentType};base64, ${content}`;

    image.setAttribute('xlink:href', newUrl);
};
