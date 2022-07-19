"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const path = require("path");
const fs = require("fs-extra");
const ora = require('ora');
const download = require("download-git-repo");
const chalk = require("chalk");
function fetchTemplate(command) {
    const templateSource = utils_1.ConstanceHelper[command].DEFAULT_TEMPLATE_SRC;
    const tempPath = path.join(process.cwd(), utils_1.ConstanceHelper[command].TEMP_DOWNLOAD_FLODER);
    return new Promise((resolve) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        // 下载文件的缓存目录
        if (fs.existsSync(tempPath)) {
            console.log('remove tempPath', tempPath);
            yield fs.remove(tempPath);
        }
        yield fs.mkdir(tempPath);
        const spinner = ora(`正在从 ${templateSource} 拉取远程模板...`).start();
        download(templateSource, utils_1.ConstanceHelper[command].TEMP_DOWNLOAD_FLODER, { clone: true }, (error) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                spinner.color = 'red';
                spinner.fail(chalk.red('拉取远程模板仓库失败！请稍后重试'));
                yield fs.remove(tempPath);
                return resolve();
            }
            spinner.color = 'green';
            spinner.succeed(`${chalk.grey('拉取远程模板仓库成功！')}`);
            resolve();
        }));
    }));
}
exports.default = fetchTemplate;
//# sourceMappingURL=fetchTemplates.js.map