import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

declare global {
    namespace Express {
        interface Request {
            validatedBody?: any;
        }
    }
}

// Explicitly annotate the return type of the middleware function
function validateRequest(schema: z.ZodSchema<any>): (req: Request, res: Response, next: NextFunction) => void {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = await schema.parseAsync(req.body);
            req.validatedBody = validatedData;
            next();
        } catch (error: any) {
            res.status(400).json(error.errors);
        }
    };
}

export default validateRequest;
