"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const utils_1 = require("../utils");
const helper_1 = require("../helper");
class Creator {
    constructor(sourceRoot) {
        const store = memFs.create();
        this.fs = editor.create(store);
        this.sourceRoot(sourceRoot || path.join((0, utils_1.getRootPath)()));
        this.init();
    }
    init() { }
    sourceRoot(rootPath) {
        if (typeof rootPath === 'string') {
            this._rootPath = path.resolve(rootPath);
        }
        if (!fs.existsSync(this._rootPath)) {
            fs.ensureDirSync(this._rootPath);
        }
        return this._rootPath;
    }
    template(filePath, dest, data, options) {
        try {
            this.fs.copyTpl(filePath, dest, Object.assign({}, this, data), options);
        }
        catch (error) {
            console.log(helper_1.default.chalk.green(`${filePath}模板创建失败:${error}`));
        }
    }
    copy(filePath, dest) {
        this.fs.copy(filePath, dest);
    }
    exchangeStyleExtFn(pathName, style) {
        (0, utils_1.exchangeStyleExt)(pathName, style);
    }
}
exports.default = Creator;
//# sourceMappingURL=creator.js.map