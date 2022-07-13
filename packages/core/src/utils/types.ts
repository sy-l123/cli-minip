export interface IPaths {
    /**
     * 当前命令执行的目录，如果是 build 命令则为当前项目路径
     */
    appPath: string
    /**
     * 当前项目配置目录，如果 init 命令，则没有此路径
     */
    configPath: string
    /**
     * 当前项目源码路径
     */
    sourcePath: string
    /**
     * 当前项目输出代码路径
     */
    outputPath: string
    /**
     * 当前项目所用的 node_modules 路径
     */
    nodeModulesPath: string
}

export type Func = (...args: any[]) => any

export interface IHook {
    name: string
    plugin?: string
    fn: Func
    before?: string
    stage?: number
}

export interface ICommand extends IHook {
    alias?: string,
    optionsMap?: {
        [key: string]: string
    },
    synopsisList?: string[]
}

export declare interface IPluginContext {
    /**
   * 包含当前执行命令的相关路径集合
   */
    paths: IPaths
    /**
   * 注册一个自定义命令
   */
    registerCommand: (command: ICommand) => void
    [prop: string]: any
}

export type PluginItem = string | [string, object]


export enum PluginType {
    Preset = 'Preset',
    Plugin = 'Plugin'
}

export interface IPlugin {
    id: string
    path: string
    opts: any
    type: PluginType
    apply: Func
}
