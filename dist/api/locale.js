"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APILocale = void 0;
const path_1 = __importDefault(require("path"));
// 
exports.APILocale = {
    ENDPOINTS: {
        parse(endpoint, argmap) {
            let result = endpoint;
            Object.keys(argmap).forEach(k => {
                result = result.replace(new RegExp(`\{\{${k}\}\}`), argmap[k]);
            });
            return result;
        },
        MAIN: "https://adventofcode.com/",
        get AUTH() { return path_1.default.join(exports.APILocale.ENDPOINTS.MAIN, "/auth/{{platform}}"); }
    }
};
