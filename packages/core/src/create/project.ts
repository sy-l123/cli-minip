import Creator from './creator'
import helper from '../helper'
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
    typescript?: boolean
    css: 'none' | 'sass' | 'less'
    sourceRoot?: string
    src?: string
}

interface AskMethods {
    (conf: IProjectConf, prompts: Record<string, unknown>[]): void
}

export default class Project extends Creator {
    public rootPath: string
    public conf: IProjectConf

    constructor(options: IProjectConf) {
        super(options.sourceRoot)
        const unSupportedVer = semver.lt(process.version, 'v7.6.0')
        if (unSupportedVer) {
            throw new Error('Node.js 版本过低，推荐升级 Node.js 至 v8.0.0+')
        }
        this.rootPath = this._rootPath
        this.conf = Object.assign({
            projectName: '',
            projectDir: '',
            template: '',
            description: ''
        }, options)
        // rootPath: D:\git-project\syl-cli\miniP\packages\core
        // conf: {
        //     projectName: 'minip',
        //     projectDir: 'D:\\git-project\\syl-cli\\miniP\\packages\\core',
        //     template: '',
        //     description: undefined,
        //     typescript: true,
        //     css: undefined
        // }
    }

    init() {
        console.log(helper.chalk.green('zncli 即将创建一个新小程序项目!'))
        // console.log(`Need help? Go and open issue: ${helper.chalk.blueBright('https://github.com/sy-l123/cli-minip-scaffold/issues')}`)
        console.log()
    }

    async create() {
        try {
            const answers = await this.ask()
            this.conf = Object.assign(this.conf, answers)
            fetchTemplate(this.conf.projectDir, 'init').then(() => {
                this.write()
            })
        } catch (error) {
            console.log(helper.chalk.red('创建项目失败: ', error))
        }
    }

    async ask() {
        let prompts: Record<string, unknown>[] = []
        const conf = this.conf

        this.askProjectName(conf, prompts)
        this.askDescription(conf, prompts)
        this.askCSS(conf, prompts)
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
        if ((typeof conf.description as string | undefined) !== 'string') {
            prompts.push({
                type: 'input',
                name: 'description',
                message: '请输入项目介绍！'
            })
        }
    }

    askCSS: AskMethods = function (conf, prompts) {
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


        if ((typeof conf.css as string | undefined) !== 'string') {
            prompts.push({
                type: 'list',
                name: 'css',
                message: '请选择 CSS 预处理器（Sass/Less/无）',
                choices: cssChoices
            })
        }
    }

    write() {
        this.conf.src = ConstanceHelper.SOURCE_DIR
        console.log('------->templateCreate ', path.join(this._rootPath, ConstanceHelper.init.TEMP_DOWNLOAD_FLODER, '/index.js'))
        const templateCreate = require(path.join(this._rootPath, ConstanceHelper.init.TEMP_DOWNLOAD_FLODER, '/index.js'))
        templateCreate(this, this.conf)
    }
}