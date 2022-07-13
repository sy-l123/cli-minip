"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Plugin {
    constructor(opts) {
        this.id = opts.id;
        this.path = opts.path;
        this.ctx = opts.ctx;
    }
    registerCommand(command) {
        console.log('do registerCommand', command);
        this.register(command);
    }
    register(hook) {
        const hooks = this.ctx.hooks.get(hook.name) || [];
        hook.plugin = this.id;
        this.ctx.hooks.set(hook.name, hooks.concat(hook));
    }
}
exports.default = Plugin;
//# sourceMappingURL=Plugin.js.map