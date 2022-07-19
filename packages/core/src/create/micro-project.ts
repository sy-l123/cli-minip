import Creator from './creator'
import * as chalk from 'chalk'
import * as semver from 'semver'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import fetchTemplate from './fetchTemplates'
import { ConstanceHelper } from '../utils'

interface IProjectConf {
    projectName: string
    projectDir: string
    description?: string
    sourceRoot?: string
    src?: string
}

interface AskMethods {
    (conf: IProjectConf, prompts: Record<string, unknown>[]): void
}

export default class MicroProject extends Creator {
    public rootPath: string
    public conf: IProjectConf

    constructor(options: IProjectConf) {
        super(options.sourceRoot)
        const unSupportedVer = semver.lt(process.version, 'v12.22.0')
        if (unSupportedVer) {
            throw new Error('Node.js 版本过低，推荐升级 Node.js 至 v12.22.0+')
        }
        this.rootPath = this._rootPath
        this.conf = Object.assign({
            projectName: '',
            projectDir: '',
            description: ''
        }, options)
    }

    init() {
        console.log(chalk.green('zncli 即将创建一个新项目!'))
        console.log()
    }

    async create() {
        try {
            const answers = await this.ask()
            this.conf = Object.assign(this.conf, answers)
            if (this.conf.projectName) {
                this.conf.projectName.replace('bu_pc_', '')
                this.conf.projectName.replace('micro-app-', '')
            }
            fetchTemplate('create').then(() => {
                this.write()
            })
        } catch (error) {
            console.log(chalk.red('创建项目失败: ', error))
        }
    }

    async ask() {
        let prompts: Record<string, unknown>[] = []
        const conf = this.conf

        this.askProjectName(conf, prompts)
        this.askDescription(conf, prompts)
        const answers = await inquirer.prompt(prompts)

        return {
            ...answers
        }
    }

    askProjectName: AskMethods = function (conf, prompts) {
        if ((typeof conf.projectName as string | undefined) !== 'string') {
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
    }

    askDescription: AskMethods = function (conf, prompts) {
        if (typeof conf.description !== 'string') {
            prompts.push({
                type: 'input',
                name: 'description',
                message: '请输入项目介绍！'
            })
        }
    }

    write() {
        this.conf.src = ConstanceHelper.SOURCE_DIR
        const templateCreate = require(path.join(process.cwd(), ConstanceHelper.create.TEMP_DOWNLOAD_FLODER, '/index.js'))
        const shelljs = require('shelljs')
        const ora = require('ora')
        templateCreate(this, this.conf, chalk, shelljs, ora)
    }
}