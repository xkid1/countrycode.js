const currentVersion = require('../package.json').version;
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const versionIncrements = ['major', 'minor', 'patch', 'prerelease'];

function getAllFolders(dirPath) {
    const obj = {};

    fs.readdirSync(dirPath).forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            const ob = fs.readdirSync(path.join(dirPath, file)).reduce(
                (acc, v) => ({
                    ...acc,
                    [v]: `${path.join(dirPath, file)}/${v}`,
                }),
                {}
            );
            Object.keys(ob).forEach((k) => {
                const removeExt = k.replace('.ts', '');
                Object.values(ob).forEach((v) => {
                    obj[removeExt] = [v];
                });
            });
        } else {
            obj[file.replace('.ts', '')] = `src/${file}`;
        }
    });
    console.log(obj);

    return obj;
}

const folders = getAllFolders('src');

async function releaseMain() {
    //
}
