"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.svgFileInlineImages = exports.svgTextInlineImages = exports.svgElementInlineImages = void 0;
const fetchLite_1 = require("./fetchLite");
const inlineImage_1 = require("./inlineImage");
const svgElementInlineImages = (svgElement, fetchLite) => __awaiter(void 0, void 0, void 0, function* () {
    const clone = svgElement.cloneNode(true); // https://github.com/microsoft/TypeScript/issues/283
    const images = Array.from(clone.querySelectorAll('image'));
    for (const image of images) {
        yield (0, inlineImage_1.inlineImage)(image, fetchLite);
    }
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    const xml = [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        clone.outerHTML,
    ].join('\n');
    return xml;
});
exports.svgElementInlineImages = svgElementInlineImages;
const svgTextInlineImages = (svgText, fetchLite, document) => __awaiter(void 0, void 0, void 0, function* () {
    const div = document.createElement('div');
    div.innerHTML = svgText;
    const { firstElementChild } = div;
    if (firstElementChild === null) {
        throw new Error(`svgTextInlineImages called with svgText containing no elements`);
    }
    return (0, exports.svgElementInlineImages)(firstElementChild, fetchLite);
});
exports.svgTextInlineImages = svgTextInlineImages;
const svgFileInlineImages = (path, fetchLite, document) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = yield (0, fetchLite_1.fetchLiteFetch)(path, fetchLite);
    return (0, exports.svgTextInlineImages)(Buffer.from(buffer).toString('utf-8'), fetchLite, document);
});
exports.svgFileInlineImages = svgFileInlineImages;
//# sourceMappingURL=svgInlineImages.js.map