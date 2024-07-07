"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToOrg = exports.createOrg = exports.getOrg = void 0;
const org_helper_1 = require("../helpers/org.helper");
const getOrg = async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const org = await (0, org_helper_1.loadSingleOrg)(orgId);
        res.status(200).json({
            status: "success",
            message: "Organization fetched successfully",
            data: org
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Process failed",
            statusCode: 500
        });
    }
};
exports.getOrg = getOrg;
const createOrg = async (req, res, next) => {
    try {
        const id = req.user.payload;
        const data = req.body;
        const org = await (0, org_helper_1.saveOrg)(id, data);
        res.status(200).json({
            status: "success",
            message: "Organization created successfully",
            data: org
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Client error ",
            statusCode: 400
        });
    }
};
exports.createOrg = createOrg;
const addUserToOrg = async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const { userId } = req.body;
        const result = await (0, org_helper_1.addUser)(orgId, userId);
        res.status(200).json({
            status: "success",
            message: "User added to organization successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Client error ",
            statusCode: 400
        });
    }
};
exports.addUserToOrg = addUserToOrg;
//# sourceMappingURL=org.controller.js.map