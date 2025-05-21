export type FetchLiteResponse =
    | ArrayBufferLike
    | { arrayBuffer: () => Promise<ArrayBufferLike> };

export type FetchLite = (path: string) => Promise<FetchLiteResponse>;

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
        return response;
    }
};
