const path = require('path')
var nodeFs = require("fs");

function exchangeStyleExt(pathName, styleExt) {
    files = nodeFs.readdirSync(pathName); // 需要用到同步读取
    files.forEach((file) => {
        states = nodeFs.statSync(pathName + "/" + file);
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
exports.exchangeStyleExt = exchangeStyleExt
