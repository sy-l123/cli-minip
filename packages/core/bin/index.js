#! /usr/bin/env node
console.log('这是一个脚手架')
try {
    require('../lib/core.js').run(process.argv.slice(2, process.argv.length));
    console.log('111')
} catch (error) {
    require('../lib/core.js')
    console.log('222')
}
