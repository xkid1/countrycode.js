let builds = require('./config').getConfig;
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const target = process.argv[process.argv.length - 1];

const dir = [
  '../package.json',
  '../README.md',
  '../LICENSE',
  '../CHANGELOG.md',
  '../global.d.ts',
  '../CODE_OF_CONDUCT.md',
  '../.gitignore',
  '../.npmignore',
  '../.npmrc',
  '../security.md',
];

if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  fs.mkdirSync(path.resolve(__dirname, '../dist'));
}

const opts = builds(target);

build(opts);
function build(builds) {
  const compiler = webpack(builds);

  /**Build  */
  compiler.run((err, stats) => {
    if (err) {
      throw err;
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + ' '
    );

    // process.stdout.write(stats.toString({ colors: true }) + '\n');

    // if (stats.hasErrors()) {
    //   console.log('stats error:', stats.compilation.errors);
    //   process.exit(1);
    // }

    // const output = stats.toJson().assetsByChunkName.main;

    for (const current of dir) {
      const newDir = current.replace('../', '');
      fs.copyFileSync(
        path.resolve(__dirname, current),
        path.resolve(__dirname, '../dist/' + newDir)
      );
    }
  });
}
