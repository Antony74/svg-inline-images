/***
 * A paired down fetch type compatible with both
 * [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) functions
 * and [fs.promises.readFile](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)
 * 
 * In browser you would typically literally pass `fetch` as a parameter, in order to use your browser's fetch function.
 * However, because usually fetch does not support `file://` urls, it may be desirable when working headlessly in nodejs
 * to pass `fs.promises.readFile` instead.  Alternatively, in a nodejs application, it might make sense to use
 * [node-fetch](https://www.npmjs.com/package/node-fetch) or nodejs's native fetch implementation.
 * Finally, you could of course provide another/your own implementation of FetchLite.
 * 
 * By requiring fetchLite as a parameter, and providing it, we can ensure the correct dependency is injected
 * for whatever JavaScript environment we are in.
 * 
 * @param path The url or path of the file we are fetching
 * @returns A promise from which the fetched file can ultimately be obtained as an ArrayBufferLike object
 */
export type FetchLite = (path: string) => Promise<FetchLiteResponse>;

export type FetchLiteResponse =
    | Buffer<ArrayBufferLike>
    | { arrayBuffer: () => Promise<ArrayBufferLike> };

const hasArrayBufferMethod = (
    response: FetchLiteResponse
): response is { arrayBuffer: () => Promise<ArrayBufferLike> } => {
    return (
        typeof response === 'object' &&
        typeof (response as { arrayBuffer?: unknown }).arrayBuffer ===
            'function'
    );
};

export const fetchLiteFetch = async (
    path: string,
    fetchLite: FetchLite
): Promise<ArrayBufferLike> => {
    if (path.startsWith('file://')) {
        path = path.slice(7);
    }

    const response = await fetchLite(path);

    if (hasArrayBufferMethod(response)) {
        return response.arrayBuffer();
    } else {
        return response.buffer;
    }
};
