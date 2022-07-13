"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const utils_1 = require("./utils");
const Plugin_1 = require("./presets/Plugin");
const tapable_1 = require("tapable");
class Kernel extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.appPath = options.appPath || process.cwd();
        this.optsPlugins = options.plugins;
        this.hooks = new Map();
    }
    resolvePlugin() {
        const allPlugins = this.optsPlugins;
        while (allPlugins.length) {
            this.initPlugin(allPlugins.shift());
        }
    }
    initPlugin(plugin) {
        // plugin:  D:\git-project\syl-cli\miniP\packages\core\dist\presets\commands\init.js
        const { id, path, opts, apply } = {
            id: plugin,
            path: plugin,
            opts: this.runOpts,
            apply() {
                return (0, utils_1.getModuleDefaultExport)(require(plugin));
            }
        };
        const pluginCtx = new Plugin_1.default({ id, path, ctx: this });
        console.log('do initPluginCtx -- >', pluginCtx);
        apply()(pluginCtx);
    }
    applyPlugins(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let name;
            let opts;
            if (typeof args === 'string') {
                name = args;
            }
            else {
                name = args.name;
                opts = args.opts;
            }
            const hooks = this.hooks.get(name) || [];
            console.log('this.hooks -->', this.hooks);
            const waterfall = new tapable_1.AsyncSeriesWaterfallHook(['arg']);
            if (hooks.length) {
                for (const hook of hooks) {
                    waterfall.tapPromise({
                        name: hook.name,
                    }, (arg) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const res = yield hook.fn(opts, arg);
                        return res;
                    }));
                }
            }
            return yield waterfall.promise(undefined);
        });
    }
    run(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let name = args.name;
            let opts = args.opts;
            this.runOpts = opts;
            this.resolvePlugin();
            yield this.applyPlugins({
                name,
                opts
            });
        });
    }
}
exports.default = Kernel;
//# sourceMappingURL=Kernel.js.map