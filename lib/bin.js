#!/usr/bin/env node

const { join } = require('path')
const { readFileSync } = require('fs')
const Engine = require('@ahmadnassri/template-literals-engine')

const engine = new Engine({ root: join(__dirname, '..', 'template') })

const source = process.argv.slice(2).shift()

function errorHandler (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

if (!source) {
  throw new Error('❌ OpenAPI Spec JSON is required')
}

const spec = JSON.parse(readFileSync(source))

const output = engine.render('index', spec)

console.log(output)
