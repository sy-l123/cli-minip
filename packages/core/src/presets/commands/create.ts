import { IPluginContext } from '../../utils/types'

export default (ctx: IPluginContext) => {
  ctx.registerCommand({
    name: 'create',
    optionsMap: {
      '--name [name]': '项目名称',
      '--description [description]': '项目介绍',
      '-h, --help': 'output usage information'
    },
    async fn(opts) {
      const { options } = opts
      const { projectName, description, appPath } = options
      const MicroProject = require('../../create/micro-project').default
      const microProject = new MicroProject({
        projectName,
        projectDir: appPath,
        description,
      })

      microProject.create()
    }
  })
}