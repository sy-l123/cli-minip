import * as path from 'path'
var nodeFs = require("fs");

export const getModuleDefaultExport = exports => exports.__esModule ? exports.default : exports

export function getRootPath (): string {
    return path.resolve(__dirname, '../../')
}

export const ConstanceHelper = {
    DEFAULT_TEMPLATE_SRC: 'github:sy-l123/cli-minip-scaffold#main',
    TEMP_DOWNLOAD_FLODER: 'minip-temp',
    OUTPUT_DIR: 'dist',
    SOURCE_DIR: 'src',
    NPM_DIR: 'npm',
}


export function exchangeStyleExt(pathName, styleExt) {
    const files = nodeFs.readdirSync(pathName); // 需要用到同步读取
    files.forEach((file) => {
        const states = nodeFs.statSync(pathName + "/" + file);
        // 判断是否是目录，是就继续递归
        if (states.isDirectory()) {
            exchangeStyleExt(pathName + "/" + file, styleExt);
        } else {
            if (file.match(/\.less/)) {
                const destFile = `${file}`.replace('.less', `.${styleExt}`)
                nodeFs.rename(path.join(pathName, file), path.join(pathName, destFile), ()=>{})
            }
        }
    });
}