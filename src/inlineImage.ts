import mime from 'mime-types';

import { FetchLite, fetchLiteFetch } from './fetchLite';

export const inlineImage = async (
    image: SVGImageElement,
    fetchLite: FetchLite
): Promise<void> => {
    for (const attributeName of ['xlink:href', 'href']) {
        let urlOrPath = image.getAttribute(attributeName);

        if (!urlOrPath) {
            continue;
        }

        try {
            const url = new URL(urlOrPath);
            switch (url.protocol) {
                case 'file:':
                    urlOrPath = urlOrPath.slice(7);
                    break;
                case 'data:':
                    continue; // image is already inline
            }
        } catch {
            // Assume it was a path not a url - whether it's any good or not is a matter for the fetcher
        }

        const buffer = await fetchLiteFetch(urlOrPath, fetchLite);

        const content = Buffer.from(buffer).toString('base64');

        const mimeType = mime.lookup(urlOrPath);

        if (mimeType === false) {
            throw new Error(`Failed to find a mime-type for '${urlOrPath}'`);
        }

        const newUrl = `data:${mimeType};base64, ${content}`;

        image.setAttribute(attributeName, newUrl);
    }
};
