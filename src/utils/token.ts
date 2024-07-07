import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


declare module 'express' {

    interface Request {
        user?: any
    }
}


// set token
export const userSignToken = async (payload: string) => {
    try {
        const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        return token;

    } catch (error) {
        console.log(error)
    }
};


// set invalid
export const setInvalidToken = (loggedout: string) => jwt.sign({ loggedout }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60,
});


// verify  token
export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
    ) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Access Denied',
                token,
            });
        }
        try {

            const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = verified;
            next();

        } catch (error) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid Token',
                token,
            });
        }

    } else {
        return res.status(500).json({
            status: 'fail',
            message: 'No Header Available',
        });
    }
};