"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const validateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            res.status(400).json({ message: "Does not exist" });
        }
        else {
            req.user = user;
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=student.checkEmail.js.map