"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrg = exports.editOrg = exports.addUser = exports.loadSingleOrg = exports.getUserOrg = exports.saveOrg = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const saveOrg = async (userId, data) => {
    const org = await prisma_1.default.organisation.create({
        data: {
            ...data,
            users: {
                create: [
                    {
                        User: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                ]
            }
        }
    });
    return org;
};
exports.saveOrg = saveOrg;
const getUserOrg = async (userId) => {
    const org = await prisma_1.default.organisation.findMany({
        where: {
            users: {
                some: {
                    User: {
                        id: userId
                    }
                }
            }
        },
    });
    return org;
};
exports.getUserOrg = getUserOrg;
const loadSingleOrg = async (orgId) => {
    const org = await prisma_1.default.organisation.findFirst({
        where: { orgId },
    });
    return org;
};
exports.loadSingleOrg = loadSingleOrg;
const addUser = async (orgId, userId) => {
    const addUserToOrg = await prisma_1.default.userOrganisation.create({
        data: {
            organisation: { connect: { orgId: orgId } },
            User: { connect: { id: userId } }
        }
    });
    return addUserToOrg;
};
exports.addUser = addUser;
const editOrg = async (orgId, data) => {
    const org = await prisma_1.default.organisation.update({
        where: { orgId: orgId },
        data
    });
    return org;
};
exports.editOrg = editOrg;
const removeOrg = async (orgId) => {
    const org = await prisma_1.default.organisation.delete({
        where: { orgId: orgId }
    });
    return org;
};
exports.removeOrg = removeOrg;
//# sourceMappingURL=org.helper.js.map