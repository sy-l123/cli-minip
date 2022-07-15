import { EventEmitter } from 'events'
import { IPaths, PluginItem, IPlugin, IHook } from './utils/types'
import * as helper from './helper'
import { getModuleDefaultExport } from './utils'
import Plugin from './presets/Plugin'
import { AsyncSeriesWaterfallHook } from 'tapable'

interface IKernelOptions {
    appPath: string
    presets?: PluginItem[]
    plugins?: PluginItem[]
}

export default class Kernel extends EventEmitter {
    appPath: string
    runOpts: any
    optsPlugins: PluginItem[]
    hooks: Map<string, IHook[]>

    constructor(options: IKernelOptions) {
        super()
        this.appPath = options.appPath || process.cwd()
        this.optsPlugins = options.plugins
        this.hooks = new Map()
    }


    resolvePlugin() {
        const allPlugins = this.optsPlugins

        while (allPlugins.length) {
            this.initPlugin(allPlugins.shift()!)
        }
    }

    initPlugin(plugin: any) {
        const { id, path, opts, apply } = {
            id: plugin,
            path: plugin,
            opts: this.runOpts,
            apply() {
                return getModuleDefaultExport(require(plugin))
            }
        }
        const pluginCtx = new Plugin({ id, path, ctx: this })
        apply()(pluginCtx)
    }

    async applyPlugins(args: any) {
        let name
        let opts
        if (typeof args === 'string') {
            name = args
        } else {
            name = args.name
            opts = args.opts
        }
        const hooks = this.hooks.get(name) || []

        const waterfall = new AsyncSeriesWaterfallHook(['arg'])
        if (hooks.length) {
            for (const hook of hooks) {
                waterfall.tapPromise({
                    name: hook.name,
                }, async (arg) => {
                    const res = await hook.fn(opts, arg)
                    return res
                })
            }
        }
        return await waterfall.promise(undefined)
    }

    async run(args: any) {
        let name = args.name
        let opts = args.opts
        this.runOpts = opts

        this.resolvePlugin()

        await this.applyPlugins({
            name,
            opts
        })
    }
}