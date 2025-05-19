import { FetchLite } from './fetchLite';
export declare const svgElementInlineImages: (svgElement: Element, fetchLite: FetchLite) => Promise<string>;
export declare const svgTextInlineImages: (svgText: string, fetchLite: FetchLite, document: Document) => Promise<string>;
export declare const svgFileInlineImages: (path: string, fetchLite: FetchLite, document: Document) => Promise<string>;
