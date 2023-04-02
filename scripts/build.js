const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
    fs.mkdirSync(path.resolve(__dirname, '../dist'));
}

let builds = require('./config').getAllBuilds();

// filter builds via command line arg
if (builds) {
    builds = builds.filter((b) => {
        return b._name.indexOf('production') > -1;
    });
}
// const filters = process.argv[2].split(',');
// builds = builds.filter((b) => {
//     return filters.some((f) => b._name.indexOf(f) > -1);
// });
build(builds);

function build(builds) {
    let built = 0;
    const total = builds.length;
    const next = () => {
        buildEntry(builds[built], () => {
            built++;
            if (built < total) {
                next();
            }
        });
    };

    next();
}

function buildEntry(config, cb) {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (err) {
            throw err;
        }
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false,
            }) + ' '
        );
    });

    compiler.hooks.done.tap('done', (stats) => {
        if (
            stats.compilation.errors &&
            stats.compilation.errors.length &&
            process.argv.indexOf('--watch') == -1
        ) {
            console.log('stats error:', stats.compilation.errors);
            process.exit(1);
        }

        const output = stats.toJson().assetsByChunkName.main;
        const jsRE = /\.js$/;
        // // const cssRE = /\.css$/;
        const assets = {
            js: output.filter((file) => jsRE.test(file)),
            // css: output.filter((file) => cssRE.test(file)),
        };

        const dest = path.resolve(__dirname, '../dist', config._name + '.json');
        write(dest, JSON.stringify(assets, null, 2), true).then(cb);
    });
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report() {
            if (zip) {
                const zipped = (code.length / 1024).toFixed(2) + 'kb';
                console.log(blue(dest + ' (' + zipped + ')'));
            } else {
                console.log(blue(dest));
            }
            resolve();
        }

        if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
            fs.mkdirSync(path.resolve(__dirname, '../dist'));
        }

        fs.writeFile(dest, code, (err) => {
            if (err) return reject(err);
            if (zip) {
                const zipped = (code.length / 1024).toFixed(2) + 'kb';
                console.log(blue(dest + ' (' + zipped + ')'));
            } else {
                report();
            }
        });
    });
}

function red(str) {
    return '\x1b[31m' + str + '\x1b[39m';
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
