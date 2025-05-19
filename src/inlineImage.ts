import mime from 'mime-types';

import { FetchLite, fetchLiteFetch } from './fetchLite';

export const inlineImage = async (
    image: SVGImageElement,
    fetchLite: FetchLite
): Promise<void> => {
    const path = image.getAttribute('xlink:href') ?? '';

    const buffer = await fetchLiteFetch(path, fetchLite);

    const content = Buffer.from(buffer).toString('base64');

    const mimeType = mime.lookup(path);

    if (mimeType === false) {
        throw new Error(`Failed to find a mime-type for '${path}'`);
    }

    const newUrl = `data:${mimeType};base64, ${content}`;

    image.setAttribute('xlink:href', newUrl);
};
