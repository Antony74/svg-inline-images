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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineImage = void 0;
const mime_types_1 = __importDefault(require("mime-types"));
const fetchLite_1 = require("./fetchLite");
const inlineImage = (image, fetchLite) => __awaiter(void 0, void 0, void 0, function* () {
    yield inlineImageAttribute(image, fetchLite, 'xlink:href');
    yield inlineImageAttribute(image, fetchLite, 'href');
});
exports.inlineImage = inlineImage;
const inlineImageAttribute = (image, fetchLite, attributeName) => __awaiter(void 0, void 0, void 0, function* () {
    let urlOrPath = image.getAttribute(attributeName);
    if (!urlOrPath) {
        return;
    }
    try {
        const url = new URL(urlOrPath);
        switch (url.protocol) {
            case 'file:':
                // lose the prefix 'file://' as neither fetch or fs.promises.readFile support it
                urlOrPath = urlOrPath.slice(7);
                break;
            case 'data:':
                return; // image is already inline
        }
    }
    catch (_a) {
        // Assume it was a path not a url - whether it's any good or not is a matter for the fetcher
    }
    const buffer = yield (0, fetchLite_1.fetchLiteFetch)(urlOrPath, fetchLite);
    const content = Buffer.from(buffer).toString('base64');
    const mimeType = mime_types_1.default.lookup(urlOrPath);
    if (mimeType === false) {
        throw new Error(`Failed to find a mime-type for '${urlOrPath}'`);
    }
    const newUrl = `data:${mimeType};base64, ${content}`;
    image.setAttribute(attributeName, newUrl);
});
//# sourceMappingURL=inlineImage.js.map