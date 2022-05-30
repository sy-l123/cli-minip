#! /usr/bin/env node

const program = require('commander')

const Project = require('../lib/project')

program
    .option('--name', '项目名称')
    .option('--typescript', '是否使用 TypeScript')
    .parse(process.argv)

const args = program.args
const {
    name,
    typescript
} = program

const projectName = args[0] || name


const project = new Project({
    projectName,
})

project.create()


// try {
//     require('../lib/core.js').run(process.argv.slice(2, process.argv.length))
//     console.log('111')
// } catch (error) {
//     require('../lib/core.js')
//     console.log('222')
// }