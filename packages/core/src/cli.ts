import * as minimist from "minimist"
import customCommand from "./commands/customCommand"
import Kernel from "./Kernel"
import * as path from 'path'
import * as fs from 'fs-extra'
export default class CLI {
    appPath: string
    constructor(appPath) {
        this.appPath = appPath || process.cwd()
    }

    run() {
        this.parseArgs()
    }

    parseArgs() {
        const args = minimist(process.argv.slice(2), {
            alias: {
                help: ['h']
            }
        })

        const _ = args._
        const command = _[0]

        if (command) {
            const appPath = this.appPath
            const presetsPath = path.resolve(__dirname, 'presets')
            const commandsPath = path.resolve(presetsPath, 'commands')
            const commandPlugins = fs.readdirSync(commandsPath)
            const targetPlugin = `${command}.js`

            const kernel = new Kernel({
                appPath,
            })
            kernel.optsPlugins = []

            // 针对不同的内置命令注册对应的命令插件
            if (commandPlugins.includes(targetPlugin)) {
                kernel.optsPlugins.push(path.resolve(commandsPath, targetPlugin))
            }

            switch (command) {
                case 'init': {
                    customCommand(command, kernel, {
                        _,
                        appPath,
                        projectName: _[1] || args.name,
                        description: args.description,
                        typescript: args.typescript,
                        css: args.css,
                        h: args.h
                    })
                }
                case 'create': {
                    customCommand(command, kernel, {
                        _,
                        appPath,
                        projectName: _[1] || args.name,
                        description: args.description,
                        h: args.h
                    })
                }
            }
        }
    }
}