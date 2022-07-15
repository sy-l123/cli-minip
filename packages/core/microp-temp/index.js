const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const shelljs = require('shelljs')
const ora = require('ora')

module.exports = function (creater, params, cb) {
    const {
        projectName,
        description,
        src = 'src',
        public = 'public'
    } = params
    const projectId = `microApp${projectName.charAt(0).toUpperCase() + projectName.slice(1)}`
    const cwd = process.cwd()
    const projectPath = path.join(cwd, projectName)
    const sourceDir = path.join(projectPath, src)
    const publicDir = path.join(projectPath, public)

    fs.mkdirSync(projectPath)
    fs.mkdirSync(sourceDir)
    fs.mkdirSync(publicDir)
    fs.mkdirSync(path.join(sourceDir, 'pages'))

    creater.template('microP-temp/pkg', path.join(projectPath, 'package.json'), {
        projectName,
        description,
    })

    creater.template('microP-temp/vueConf', path.join(projectPath, 'vue.config.js'), {
        projectName,
    })

    creater.template('microP-temp/.eslintrc.js', path.join(projectPath, '.eslintrc.json'))
    creater.template('microP-temp/.eslintignore', path.join(projectPath, '.eslintignore'))
    creater.template('microP-temp/.browserslistrc', path.join(projectPath, '.browserslistrc'))
    creater.template('microP-temp/.editorconfig', path.join(projectPath, '.editorconfig'))
    creater.template('microP-temp/babel.config.js', path.join(projectPath, 'babel.config.js'))
    creater.template('microP-temp/README.md', path.join(projectPath, 'README.md'))
    creater.template('microP-temp/.gitignore', path.join(projectPath, '.gitignore'))

    creater.copy('microP-temp/public/favicon.ico', path.join(projectPath, 'public/favicon.ico'))
    creater.template('microP-temp/public/index.html', path.join(projectPath, 'public/index.html'), {
        projectId,
    })
    creater.copy('microP-temp/src', path.join(projectPath, 'src'))

    creater.fs.commit(() => {
        console.log()
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建项目: ${chalk.grey.bold(projectName)}`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建源码目录: ${projectName}/${src}`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/pages`)}`)

        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/package.json`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/vue.config.js`)}`)

        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.eslintrc.json`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.eslintignore`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.browserslistrc`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.editorconfig`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/babel.config.js`)}`)

        
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/README.md`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.gitignore`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`拷贝源码: ${projectName}/${public}`)}`)
        console.log(`${chalk.green('✔ ')}${chalk.grey(`拷贝源码: ${projectName}/${src}`)}`)

        // 目录切换
        shelljs.cd(projectPath);
        const command = 'npm install'
        const installSpinner = ora(`执行安装项目依赖 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()
        const install = shelljs.exec(command, {
            silent: true
        })
        if (install.code === 0) {
            installSpinner.color = 'green'
            installSpinner.succeed('安装成功')
            console.log(`${install.stderr}${install.stdout}`)
        } else {
            installSpinner.color = 'red'
            installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'))
            console.log(`${install.stderr}${install.stdout}`)
        }
        console.log(chalk.green(`创建项目 ${chalk.green.bold(projectName)} 成功！`))
        console.log(chalk.green(`请进入项目目录 ${chalk.green.bold(projectName)} 开始工作吧！😝`))
    })
}