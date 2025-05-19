type FetchLiteResponse = ArrayBufferLike | {
    arrayBuffer: () => Promise<ArrayBufferLike>;
};
export type FetchLite = (path: string) => Promise<FetchLiteResponse>;
export declare const fetchLiteFetch: (path: string, fetchLite: FetchLite) => Promise<ArrayBufferLike>;
export {};
