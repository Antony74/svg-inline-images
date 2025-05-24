/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const path = require('path');
const fsp = require('fs/promises');

const concatMd = require('concat-md').default;

const order = [
    'svgElementInlineImages',
    'svgTextInlineImages',
    'svgFileInlineImages',
    'FetchLiteResponse',
    'FetchLite',
];

const removeHeader = async (itemPath) => {
    const stat = await fsp.lstat(itemPath);

    if (stat.isDirectory()) {
        const items = await fsp.readdir(itemPath);
        const paths = items.map((filename) => path.join(itemPath, filename));
        for (const newPath of paths) {
            await removeHeader(newPath);
        }
    } else {
        const fullContent = await fsp.readFile(itemPath, { encoding: 'utf-8' });

        const content = fullContent
            .split('#')
            .map((s, index) => (s = index ? s : ''))
            .join('#');

        await fsp.writeFile(itemPath, content);
    }
};

const main = async () => {
    await removeHeader(path.join(__dirname, 'docs'));

    const documentation = await concatMd(path.join(__dirname, 'docs'), {
        decreaseTitleLevels: true,
        startTitleLevelAt: 3,
        ignore: ['**/README.md', '**/fetchLiteFetch.md', '**/inlineImage.md'],
        sorter: (a, b) => {
            const aName = path.parse(a).name;
            const bName = path.parse(b).name;
            const aIndex = order.findIndex((s) => s === aName);
            const bIndex = order.findIndex((s) => s === bName);
            return aIndex - bIndex;
        },
    });

    // Append header file manually so its title levels do not decrease
    const header = await fsp.readFile(path.join(__dirname, 'header.md'));

    await fsp.writeFile(
        path.join(__dirname, 'README.md'),
        header + documentation
    );
};

main();
