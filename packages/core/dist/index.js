"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroProject = exports.MinipProject = void 0;
const minip_project_1 = require("./create/minip-project");
exports.MinipProject = minip_project_1.default;
const micro_project_1 = require("./create/micro-project");
exports.MicroProject = micro_project_1.default;
exports.default = {
    MinipProject: minip_project_1.default,
    MicroProject: micro_project_1.default
};
//# sourceMappingURL=index.js.map