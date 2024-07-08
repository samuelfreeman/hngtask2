import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/httpCustomError';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        console.error(error)
        res.status(error.status).json({ message: error.message });
    } else {
        console.error('Unhandled Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default errorHandler;
