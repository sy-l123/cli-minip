"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const creator_1 = require("./creator");
const helper_1 = require("../helper");
const semver = require("semver");
const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const fetchTemplates_1 = require("./fetchTemplates");
const utils_1 = require("../utils");
class MicroProject extends creator_1.default {
    constructor(options) {
        super(options.sourceRoot);
        this.askProjectName = function (conf, prompts) {
            if (typeof conf.projectName !== 'string') {
                prompts.push({
                    type: 'input',
                    name: 'projectName',
                    message: '请输入项目名称！',
                    validate(input) {
                        if (!input) {
                            return '项目名不能为空！';
                        }
                        if (fs.existsSync(input)) {
                            return '当前目录已经存在同名项目，请换一个项目名！';
                        }
                        return true;
                    }
                });
            }
            else if (fs.existsSync(conf.projectName)) {
                prompts.push({
                    type: 'input',
                    name: 'projectName',
                    message: '当前目录已经存在同名项目，请换一个项目名！',
                    validate(input) {
                        if (!input) {
                            return '项目名不能为空！';
                        }
                        if (fs.existsSync(input)) {
                            return '项目名依然重复！';
                        }
                        return true;
                    }
                });
            }
        };
        this.askDescription = function (conf, prompts) {
            if (typeof conf.description !== 'string') {
                prompts.push({
                    type: 'input',
                    name: 'description',
                    message: '请输入项目介绍！'
                });
            }
        };
        const unSupportedVer = semver.lt(process.version, 'v12.22.0');
        if (unSupportedVer) {
            throw new Error('Node.js 版本过低，推荐升级 Node.js 至 v12.22.0+');
        }
        this.rootPath = this._rootPath;
        this.conf = Object.assign({
            projectName: '',
            projectDir: '',
            description: ''
        }, options);
    }
    init() {
        console.log(helper_1.default.chalk.green('zncli 即将创建一个新项目!'));
        console.log();
    }
    create() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const answers = yield this.ask();
                this.conf = Object.assign(this.conf, answers);
                if (this.conf.projectName) {
                    this.conf.projectName.replace('bu_pc_', '');
                    this.conf.projectName.replace('micro-app-', '');
                }
                (0, fetchTemplates_1.default)(this.conf.projectDir, 'create').then(() => {
                    this.write();
                });
            }
            catch (error) {
                console.log(helper_1.default.chalk.red('创建项目失败: ', error));
            }
        });
    }
    ask() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let prompts = [];
            const conf = this.conf;
            this.askProjectName(conf, prompts);
            this.askDescription(conf, prompts);
            const answers = yield inquirer.prompt(prompts);
            return Object.assign({}, answers);
        });
    }
    write() {
        this.conf.src = utils_1.ConstanceHelper.SOURCE_DIR;
        const templateCreate = require(path.join(process.cwd(), utils_1.ConstanceHelper.create.TEMP_DOWNLOAD_FLODER, '/index.js'));
        templateCreate(this, this.conf);
    }
}
exports.default = MicroProject;
//# sourceMappingURL=micro-project.js.map