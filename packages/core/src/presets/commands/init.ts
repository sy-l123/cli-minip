import { IPluginContext } from '../../utils/types'
// import { default as Project } from '../../create/project'

export default (ctx: IPluginContext) => {
  ctx.registerCommand({
    name: 'init',
    optionsMap: {
      '--name [name]': '项目名称',
      '--description [description]': '项目介绍',
      '--typescript': '使用TypeScript',
      '--css [css]': 'CSS预处理器(sass/less/stylus/none)',
      '-h, --help': 'output usage information'
    },
    async fn(opts) {
      // init project
      console.log('init do opts', opts)
      /* _: [ 'init', 'minip' ],
        options: {
          appPath: 'D:\\git-project\\syl-cli\\miniP\\packages\\core',
          projectName: 'minip',
          description: undefined,
          typescript: true,
          css: undefined
        },
        isHelp: undefined*/
      const { options } = opts
      const { projectName, description, typescript, css, appPath } = options
      const Project = require('../../create/project').default
      const project = new Project({
        projectName,
        projectDir: appPath,
        description,
        typescript,
        css
      })

      project.create()
    }
  })
}