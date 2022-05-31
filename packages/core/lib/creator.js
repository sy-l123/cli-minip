const path = require('path')
const fs = require('fs-extra')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

const {
    exchangeStyleExt
} = require('./utils')

class Creator {
    constructor() {
        const store = memFs.create()
        this.fs = editor.create(store)
        this.sourceRoot(path.join(this.getRootPath()))
        this.init()
    }

    init() {}

    sourceRoot(rootPath) {
        if (typeof rootPath === 'string') {
            this._rootPath = path.resolve(rootPath)
        }
        if (!fs.existsSync(this._rootPath)) {
            fs.ensureDirSync(this._rootPath)
        }
        return this._rootPath
    }

    getRootPath () {
        return path.resolve(__dirname, '../../')
    }

    template(filePath, dest, data, options) {
        // console.log('from-->', path.join(this._rootPath, filePath));
        // console.log('to--->', dest)
        this.fs.copyTpl(
            path.join(this._rootPath, filePath),
            dest,
            Object.assign({}, this, data),
            options
        )
    }

    copy(filePath, dest) {
        this.fs.copy(
            path.join(this._rootPath, filePath),
            dest,
        )
    }

    exchangeStyleExtFn(pathName, style) {
        exchangeStyleExt(pathName, style)
    }
}

module.exports = Creator