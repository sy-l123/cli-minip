import Kernel from "../Kernel"
import { ICommand } from '../utils/types'

export default class Plugin {
    id: string
    path: string
    ctx: Kernel
    optsSchema: (...args: any[]) => void

    constructor(opts) {
        this.id = opts.id
        this.path = opts.path
        this.ctx = opts.ctx
    }

    registerCommand(command: ICommand) {
        console.log('do registerCommand', command)
        this.register(command)
    }

    register(hook) {
        const hooks = this.ctx.hooks.get(hook.name) || []
        hook.plugin = this.id
        this.ctx.hooks.set(hook.name, hooks.concat(hook))
    }
}