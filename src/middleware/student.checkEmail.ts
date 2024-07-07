import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

declare global {
    namespace Express {
        interface Request {
            validatedEmail?: string;
            user?: any;
        }
    }
}

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: { email: string } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            res.status(400).json({ message: "Does not exist" });
        } else {

            req.user = user;

            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
};
