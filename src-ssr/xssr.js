/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

const { GetSsrState } = require('aof-air')

const fs = require('fs'),
  path = require('path'),
  AF = require('avuef'),
  LRU = require('lru-cache'),
  { createBundleRenderer } = require('vue-server-renderer')

// console.log(path.join('template.html'))
// fs.readFileSync(resolve('template.html'), 'utf-8')
const _dir = path.resolve('./dist/ssr')
const resolve = file => path.join(_dir, file),
  template = fs.readFileSync(_dir + '/template.html', 'utf-8'),
  bundle = require('./../vue-ssr-server-bundle.json'),
  clientManifest = require('./../vue-ssr-client-manifest.json')

const settings = {
  pwa: false,
  componentCache: {
    max: 1000,
    maxAge: 900000
  },
  debug: false
}

if (process.env.DEBUG) {
  settings.debug = true
}

const rendererOptions = {
  template,
  clientManifest,
  // for component caching
  //cache: new LRU(settings.componentCache),
  basedir: __dirname,
  // recommended for performance
  runInNewContext: false
}

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
let renderer = createBundleRenderer(bundle, rendererOptions)

module.exports.renderToString = function({ req, res }, cb) {
  let state = { test: 0 }

  const ctx = {
    url: req.url,
    req,
    res,
    //state: GetSsrState(req.url)
  }
  renderer.renderToString(ctx, cb)
}

module.exports.resolveWWW = function(file) {
  return resolve('www/' + file)
}

module.exports.mergeRendererOptions = function(opts) {
  renderer = createBundleRenderer(bundle, Object.assign(rendererOptions, opts))
}

module.exports.settings = settings
