"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = exports.setInvalidToken = exports.userSignToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// set token
const userSignToken = async (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign({ payload }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        return token;
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSignToken = userSignToken;
// set invalid
const setInvalidToken = (loggedout) => jsonwebtoken_1.default.sign({ loggedout }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60,
});
exports.setInvalidToken = setInvalidToken;
// verify  token
const verifyUserToken = (req, res, next) => {
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Access Denied',
                token,
            });
        }
        try {
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            req.user = verified;
            next();
        }
        catch (error) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid Token',
                token,
            });
        }
    }
    else {
        return res.status(500).json({
            status: 'fail',
            message: 'No Header Available',
        });
    }
};
exports.verifyUserToken = verifyUserToken;
//# sourceMappingURL=token.js.map