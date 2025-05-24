import fs from 'fs';

import { JSDOM } from 'jsdom';
import mockFs from 'mock-fs';
import fetchMock from 'fetch-mock';

import {
    svgElementInlineImages,
    svgFileInlineImages,
    svgTextInlineImages,
} from '../src';

const dom = new JSDOM();

const svgTemplate = (content: string) => {
    return [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`,
    ].join('\n');
};

// This is the base64 encoded for a .png file, 10x10pixels, of a green circle on a red background
const testBase64 = [
    'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAUElEQVR4X',
    'mP4z8AAQZd0GWakgxCQARcE4Y98DNFLYAJgBOQCBaHSMYtR5CAIKAiSvqiHLgFHIKlZqeiicASSIiBNwPD/+J',
    '32n6DHIAhrsAAAeg5jnSsMZjQAAAAASUVORK5CYII=',
].join('');

const dataPrefix = `data:image/png;base64, `;
const hrefImage = `<image href="image.png"></image>`;
const xlinkHrefImage = `<image xlink:href="image.png"></image>`;

const mocks = {
    'good.svg': svgTemplate(xlinkHrefImage + hrefImage),
    'image.png': Buffer.from(testBase64, 'base64'),
};

fetchMock.config.allowRelativeUrls = true;
fetchMock.route('/good.svg', svgTemplate(xlinkHrefImage + hrefImage));
fetchMock.route('/image.png', Buffer.from(testBase64, 'base64'));

describe('svgInlineImages', () => {
    beforeAll(() => {
        mockFs(mocks);
    });

    afterAll(() => {
        mockFs.restore();
    });

    it(`can inline images with fetch`, async () => {
        const result = await svgFileInlineImages(
            'good.svg',
            fetchMock.fetchHandler,
            dom.window.document
        );
        expect(result).toEqual(
            svgTemplate(
                [
                    `<image xlink:href="${dataPrefix}${testBase64}"></image>`,
                    `<image href="${dataPrefix}${testBase64}"></image>`,
                ].join('')
            )
        );
    });

    it(`can inline images with fs.promises.readFile`, async () => {
        const result = await svgFileInlineImages(
            'good.svg',
            fs.promises.readFile,
            dom.window.document
        );
        expect(result).toEqual(
            svgTemplate(
                [
                    `<image xlink:href="${dataPrefix}${testBase64}"></image>`,
                    `<image href="${dataPrefix}${testBase64}"></image>`,
                ].join('')
            )
        );
    });

    it(`ignores images which have already been inlined`, async () => {
        const result1 = await svgFileInlineImages(
            'good.svg',
            fs.promises.readFile,
            dom.window.document
        );

        const result2 = await svgTextInlineImages(
            result1,
            fs.promises.readFile,
            dom.window.document
        );

        expect(result2).toEqual(
            svgTemplate(
                [
                    `<image xlink:href="${dataPrefix}${testBase64}"></image>`,
                    `<image href="${dataPrefix}${testBase64}"></image>`,
                ].join('')
            )
        );
    });

    describe(`svgElementInlineImages`, () => {
        it(`has a working example`, async () => {
            const document = new JSDOM('<svg></svg>').window.document;
            // example code
            const svgElement = document.querySelector('svg');
            const svgText = await svgElementInlineImages(svgElement!, fetch);
            // end of example code
            expect(svgText).toEqual(svgTemplate(''));
        });
    });
});
