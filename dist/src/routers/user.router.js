"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const student_checkEmail_1 = require("../middleware/student.checkEmail");
const user_controller_1 = require("../controllers/user.controller");
const zod_schema_1 = require("../utils/zod.schema");
const zod_validationError_1 = __importDefault(require("../utils/zod.validationError"));
const token_1 = require("../utils/token");
const secured = [token_1.verifyUserToken];
userRouter.post("/auth/register", (0, zod_validationError_1.default)(zod_schema_1.user), user_controller_1.register);
userRouter.post("/auth/login", (0, zod_validationError_1.default)(zod_schema_1.userLogin), student_checkEmail_1.validateEmail, user_controller_1.login);
userRouter.get("/api/users/:id", secured, user_controller_1.singleUser);
userRouter.get("/api/organisations", secured, user_controller_1.usersOrgs);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map