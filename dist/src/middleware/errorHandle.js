"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCustomError_1 = __importDefault(require("../utils/httpCustomError"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof httpCustomError_1.default) {
        res.status(error.status).json({ message: error.message });
    }
    else {
        console.error('Unhandled Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandle.js.map