"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.promise = exports.fileDate = void 0;
var Date_1 = __importDefault(require("./modules/Date"));
exports.date = Date_1.default;
var Promise_1 = __importDefault(require("./modules/Promise"));
exports.promise = Promise_1.default;
var singles_1 = require("./modules/singles");
Object.defineProperty(exports, "fileDate", { enumerable: true, get: function () { return singles_1.fileDate; } });
global.Date = Date_1.default;
global.Promise = Promise_1.default;
global.fileDate = singles_1.fileDate;
//# sourceMappingURL=global.js.map