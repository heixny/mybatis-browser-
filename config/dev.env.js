'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONT_URI: '"http://localhost:8081/"',
  BACK_URI: '"http://localhost:8082/"'
})
