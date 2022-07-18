"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.default = (ctx) => {
    ctx.registerCommand({
        name: 'create',
        optionsMap: {
            '--name [name]': '项目名称',
            '--description [description]': '项目介绍',
            '-h, --help': 'output usage information'
        },
        fn(opts) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { options } = opts;
                const { projectName, description, appPath } = options;
                const MicroProject = require('../../create/micro-project').default;
                const microProject = new MicroProject({
                    projectName,
                    projectDir: appPath,
                    description,
                });
                microProject.create();
            });
        }
    });
};
//# sourceMappingURL=create.js.map