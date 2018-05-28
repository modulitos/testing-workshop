const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = {
  // not transpiling esm allows webpack to enable unused code elimination:
  presets: [['env', {modules: isTest ? 'commonjs' : false}], 'react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    // This allows us to handle dynamic imports, which helps for node environments:
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
}
