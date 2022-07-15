import { ConstanceHelper } from '../utils'
import * as path from 'path'
import * as fs from 'fs-extra'
const ora = require('ora')
import * as download from 'download-git-repo'
import helper from '../helper'

export interface ITemplates {
    name: string,
    desc?: string
}


export default function fetchTemplate(templateRootPath: string, command: string): Promise<void> {
    const templateSource: string = ConstanceHelper[command].DEFAULT_TEMPLATE_SRC
    const tempPath = path.join(templateRootPath, ConstanceHelper[command].TEMP_DOWNLOAD_FLODER)
    return new Promise(async (resolve) => {
        // 下载文件的缓存目录
        if (fs.existsSync(tempPath)) {
            console.log('remove tempPath', tempPath)
            await fs.remove(tempPath)
        }
        await fs.mkdir(tempPath)

        const spinner = ora(`正在从 ${templateSource} 拉取远程模板...`).start()
        download(templateSource, ConstanceHelper[command].TEMP_DOWNLOAD_FLODER, { clone: true }, async error => {
            if (error) {
                console.log(error)
                spinner.color = 'red'
                spinner.fail(helper.chalk.red('拉取远程模板仓库失败！'))
                await fs.remove(tempPath)
                return resolve()
            }
            spinner.color = 'green'
            spinner.succeed(`${helper.chalk.grey('拉取远程模板仓库成功！')}`)
            resolve()
        })
    })
}
