"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersOrgs = exports.singleUser = exports.login = exports.register = void 0;
const token_1 = require("../utils/token");
const user_helper_1 = require("../helpers/user.helper");
const org_helper_1 = require("../helpers/org.helper");
const argon_1 = require("../utils/argon");
const register = async (req, res, next) => {
    const data = req.body;
    try {
        const user = await (0, user_helper_1.saveUser)(data);
        const accessToken = await (0, token_1.userSignToken)(user.id);
        const { password, ...withoutPass } = user;
        res.status(201).json({
            status: "success",
            message: "Registration successfull",
            data: {
                accessToken,
                user: withoutPass
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: "Bad request",
            message: "Registration unsuccessfull!",
            statusCode: 400,
        });
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        let { password } = req.body;
        const Userpassword = req.user.password;
        const accessToken = await (0, token_1.userSignToken)(req.user.id);
        const verifyPassword = await (0, argon_1.verfiyPassword)(Userpassword, password);
        if (!verifyPassword) {
            res.status(400).json({
                message: "Invalid credentials"
            });
        }
        else {
            let { password, ...withoutPass } = req.user;
            res.status(200).json({
                status: "success",
                message: "Login successfull",
                data: {
                    accessToken,
                    user: withoutPass
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
};
exports.login = login;
// get a single user's id 
const singleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_helper_1.loadUser)(id);
        const { password, ...withoutpass } = user;
        res.status(200).json({
            status: "success",
            message: "User fetched successfully",
            data: withoutpass
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
};
exports.singleUser = singleUser;
// get a user's organization on his
const usersOrgs = async (req, res, next) => {
    try {
        const id = req.user.payload;
        const organisations = await (0, org_helper_1.getUserOrg)(id);
        res.status(200).json({
            status: "success",
            message: "User's organization fetched successfully",
            data: {
                organisations
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Internal Server error",
            message: "Process failed",
            statusCode: 500
        });
    }
};
exports.usersOrgs = usersOrgs;
//# sourceMappingURL=user.controller.js.map