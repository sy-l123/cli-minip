"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const customCommand_1 = require("./commands/customCommand");
const Kernel_1 = require("./Kernel");
const path = require("path");
const fs = require("fs-extra");
class CLI {
    constructor(appPath) {
        this.appPath = appPath || process.cwd();
    }
    run() {
        this.parseArgs();
    }
    parseArgs() {
        const args = minimist(process.argv.slice(2), {
            alias: {
                help: ['h']
            }
        });
        console.log('args', args);
        // node bin/minip init minip -v --name ss --typescript
        // args { _: [ 'init', 'minip' ], v: true, name: 'ss', typescript: true }
        const _ = args._;
        const command = _[0];
        if (command) {
            const appPath = this.appPath;
            const presetsPath = path.resolve(__dirname, 'presets');
            const commandsPath = path.resolve(presetsPath, 'commands');
            const commandPlugins = fs.readdirSync(commandsPath);
            const targetPlugin = `${command}.js`;
            const kernel = new Kernel_1.default({
                appPath, // D:\git-project\syl-cli\miniP\packages\core
            });
            kernel.optsPlugins = [];
            // 针对不同的内置命令注册对应的命令插件
            if (commandPlugins.includes(targetPlugin)) {
                kernel.optsPlugins.push(path.resolve(commandsPath, targetPlugin));
            }
            switch (command) {
                case 'init': {
                    (0, customCommand_1.default)(command, kernel, {
                        _,
                        appPath,
                        projectName: _[1] || args.name,
                        description: args.description,
                        typescript: args.typescript,
                        css: args.css,
                        h: args.h
                    });
                }
            }
        }
    }
}
exports.default = CLI;
//# sourceMappingURL=cli.js.map