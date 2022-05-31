const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

const {
    SOURCE_DIR
} = require('./config')

const Creator = require('./creator')

class Project extends Creator {
    constructor(options) {
        super()
        this.conf = Object.assign({
            projectName: null,
        }, options)
    }

    init() {
        console.log(chalk.green(`zn即将创建一个新项目!`))
        console.log()
    }

    create() {
        this.ask()
            .then(answers => {
                const date = new Date()
                this.conf = Object.assign(this.conf, answers)
                this.conf.date = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
                this.write()
            })
    }

    ask() {
        const prompts = []
        const conf = this.conf
        if (typeof conf.projectName !== 'string') {
            prompts.push({
                type: 'input',
                name: 'projectName',
                message: '请输入项目名称！',
                validate(input) {
                    if (!input) {
                        return '项目名不能为空！'
                    }
                    if (fs.existsSync(input)) {
                        return '当前目录已经存在同名项目，请换一个项目名！'
                    }
                    return true
                }
            })
        } else if (fs.existsSync(conf.projectName)) {
            prompts.push({
                type: 'input',
                name: 'projectName',
                message: '当前目录已经存在同名项目，请换一个项目名！',
                validate(input) {
                    if (!input) {
                        return '项目名不能为空！'
                    }
                    if (fs.existsSync(input)) {
                        return '项目名依然重复！'
                    }
                    return true
                }
            })
        }


        const cssChoices = [{
            name: 'Less',
            value: 'less'
        }, {
            name: 'Sass',
            value: 'sass'
        }, {
            name: '无',
            value: 'none'
        }]

        prompts.push({
            type: 'list',
            name: 'css',
            message: '请选择 CSS 预处理器（Sass/Less）',
            choices: cssChoices
        })

        return inquirer.prompt(prompts)
    }

    write(cb) {
        this.conf.src = SOURCE_DIR
        // this._rootPath D:\git-project\syl-cli\minip\packages
        const templateCreate = require(path.join(this._rootPath, 'core/lib/templates/index.js'))
        templateCreate(this, this.conf, cb)
    }
}

module.exports = Project