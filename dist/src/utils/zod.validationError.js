"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Explicitly annotate the return type of the middleware function
function validateRequest(schema) {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.parseAsync(req.body);
            req.validatedBody = validatedData;
            next();
        }
        catch (error) {
            res.status(400).json(error.errors);
        }
    };
}
exports.default = validateRequest;
//# sourceMappingURL=zod.validationError.js.map