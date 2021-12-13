const path = require('path');
const webpack = require('webpack');
const FEPSPlugin = require('../../lib');
const argv = process.argv.slice(2);

/** @type {webpack.Configuration} */
const config = {
  target: 'web',
  mode: 'development',
  context: __dirname,
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new FEPSPlugin({
      debug: true,
      disabled: false,
      rootDir: __dirname,
      timeLimit: 50,
      logger: 'globalThis.logger', // 'console.warn',
      include: [/\.(tsx?|jsx?)$/],
      exclude: ['node_modules', /\.ignore\./],
    }),
  ],
  cache: { type: 'memory' },
  stats: true,
  devtool: 'cheap-module-source-map',
};

const run = () => {
  /**
   * @param {Error} err
   * @param {webpack.Stats} stats
   */
  const callback = (err, stats) => {
    if (err) return console.error(err);

    console.log('Done!', 'hasErrors:', stats.hasErrors(), 'hasWarnings:', stats.hasWarnings());
    if (stats.hasErrors()) console.log('hasErrors:', stats.toJson().errors);
    if (stats.hasWarnings()) console.log('hasWarnings:', stats.toJson().warnings);
  };

  if (argv.includes('--watch')) {
    webpack(config).watch({ ignored: ['node_modules'] }, callback);
  } else {
    webpack(config).run(callback);
  }
}

if (argv.includes('--run')) run();
