"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
const fs = require("path");
const chalk = require("chalk");
exports.helper = {
    fs,
    chalk,
    createDebug: id => require('debug')(id)
};
exports.default = exports.helper;
//# sourceMappingURL=helper.js.map