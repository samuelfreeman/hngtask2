"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.editUser = exports.loadUsers = exports.loadUser = exports.saveUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const argon_1 = require("../utils/argon");
//  create user 
const saveUser = async (data) => {
    data.password = await (0, argon_1.hashPassword)(data.password);
    const user = await prisma_1.default.user.create({
        data: {
            ...data,
            organisations: {
                create: [
                    {
                        organisation: {
                            create: {
                                name: `${data.firstname}'s Organisation`,
                                description: `This organisation was created by ${data.firstname} ${data.lastname}`
                            }
                        }
                    }
                ]
            }
        }
    });
    return user;
};
exports.saveUser = saveUser;
const loadUser = async (id) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id }
    });
    return user;
};
exports.loadUser = loadUser;
const loadUsers = async () => {
    const user = await prisma_1.default.user.findMany({});
    return user;
};
exports.loadUsers = loadUsers;
const editUser = async (id, data) => {
    const user = await prisma_1.default.user.update({
        where: { id },
        data
    });
    return user;
};
exports.editUser = editUser;
const removeUser = async (id) => {
    const user = await prisma_1.default.user.delete({
        where: { id }
    });
    return user;
};
exports.removeUser = removeUser;
//# sourceMappingURL=user.helper.js.map