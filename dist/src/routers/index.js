"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appRouter = (0, express_1.Router)();
const user_router_1 = __importDefault(require("./user.router"));
const org_router_1 = __importDefault(require("./org.router"));
appRouter.use(user_router_1.default);
appRouter.use(org_router_1.default);
exports.default = appRouter;
//# sourceMappingURL=index.js.map