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
exports.fetchLiteFetch = void 0;
const hasArrayBufferMethod = (response) => {
    return (typeof response === 'object' &&
        typeof response.arrayBuffer ===
            'function');
};
const fetchLiteFetch = (path, fetchLite) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetchLite(path);
    if (hasArrayBufferMethod(response)) {
        return response.arrayBuffer();
    }
    else {
        return response.buffer;
    }
});
exports.fetchLiteFetch = fetchLiteFetch;
//# sourceMappingURL=fetchLite.js.map