"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    status;
    constructor(status, message) {
        if (message instanceof Error) {
            super(message.message);
            this.stack = message.stack;
        }
        else {
            super(message.toString()); // Use toString() to handle unknown type safely
        }
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
//# sourceMappingURL=httpCustomError.js.map