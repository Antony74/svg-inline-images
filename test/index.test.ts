import fs from 'fs';

import { JSDOM } from 'jsdom';
import mockFs from 'mock-fs';

import { svgFileInlineImages } from '../src';

const dom = new JSDOM();

const svgTemplate = (content: string) => {
    return [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`,
    ].join('\n');
};

const mocks = {
    'good.svg': svgTemplate(''),
};

describe('svgInlineImages', () => {
    beforeAll(() => {
        mockFs(mocks);
    });

    afterAll(() => {
        mockFs.restore();
    })

    it(`can inline images with fs.promises.readFile`, async () => {
        const result = await svgFileInlineImages(
            'good.svg',
            fs.promises.readFile,
            dom.window.document
        );
        expect(result).toEqual(mocks['good.svg']);
    });
});
