const isTest = String(process.env.NODE_ENV) === 'test'

// for the env plugin modules config:
// isTest ? 'commonjs' : false

// For dynamic import config in plugins
// isTest ? 'dynamic-import-node' : null
module.exports = {
  // use modules:false here b/c webpack support esm and this allows webpack to do "tree shaking"
  // presets: [['env', {modules: false}], 'react'],
  presets: [['env', {modules: isTest ? 'commonjs' : false}], 'react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
  ],
}

/*
Solution snippets below
































































const isTest = String(process.env.NODE_ENV) === 'test'


for the env plugin modules config:
isTest ? 'commonjs' : false

For dynamic import config in plugins
isTest ? 'dynamic-import-node' : null
 */
