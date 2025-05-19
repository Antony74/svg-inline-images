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
    var _a;
    const path = (_a = image.getAttribute('xlink:href')) !== null && _a !== void 0 ? _a : '';
    const buffer = yield (0, fetchLite_1.fetchLiteFetch)(path, fetchLite);
    const content = Buffer.from(buffer).toString('base64');
    const mimeType = mime_types_1.default.lookup(path);
    if (mimeType === false) {
        throw new Error(`Failed to find a mime-type for '${path}'`);
    }
    const newUrl = `data:${mimeType};base64, ${content}`;
    image.setAttribute('xlink:href', newUrl);
});
exports.inlineImage = inlineImage;
//# sourceMappingURL=inlineImage.js.map