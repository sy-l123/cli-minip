import * as path from 'path'
import * as fs from 'fs-extra'
import * as memFs from 'mem-fs'
import * as editor from 'mem-fs-editor'
import { getRootPath, exchangeStyleExt } from '../utils'
import helper from '../helper'

interface IFile {}

interface IMemFsEditor {
    store: {
        [key: string]: IFile
    }
    copyTpl(from: string, to: string, context: Record<any, any>, templateOptions: Record<any, any>)
    copy(from: string, to: string)
}

export default class Creator {
    fs: IMemFsEditor
    protected _rootPath: string
    private _destinationRoot: string

    constructor(sourceRoot?: string) {
        const store = memFs.create()
        this.fs = editor.create(store)
        this.sourceRoot(sourceRoot || path.join(getRootPath()))
        this.init()
    }

    init() {}

    sourceRoot(rootPath?: string) {
        if (typeof rootPath === 'string') {
            this._rootPath = path.resolve(rootPath)
        }
        if (!fs.existsSync(this._rootPath)) {
            fs.ensureDirSync(this._rootPath)
        }
        return this._rootPath
    }

    template(filePath, dest, data, options) {
        try {
            this.fs.copyTpl(
                filePath,
                dest,
                Object.assign({}, this, data),
                options
            )
        } catch (error) {
            console.log(helper.chalk.green(`${filePath}模板创建失败:${error}`, ))
        }
    }

    copy(filePath, dest) {
        this.fs.copy(
            filePath,
            dest,
        )
    }

    exchangeStyleExtFn(pathName, style) {
        exchangeStyleExt(pathName, style)
    }
}