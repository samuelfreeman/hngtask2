import express, { Request, Response, NextFunction } from 'express'





import { saveOrg, loadSingleOrg,  addUser } from '../helpers/org.helper'
import { user } from 'utils/zod.schema'




export const getOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orgId } = req.params
        const org = await loadSingleOrg(orgId);
        res.status(200).json({
            status: "success",
            message: "Organization fetched successfully",
            data: org
        })
    } catch (error) {
        res.status(500).json({
            status: "Bad request",
            message: "Process failed",
            statusCode: 500
        })
    }

}

export const createOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user.payload;
        const data = req.body;
        const org = await saveOrg(id, data);
        res.status(200).json({
            status: "success",
            message: "Organization created successfully",
            data: org
        })
    }
    catch (error) {

        res.status(500).json({
            status: "Bad request",
            message: "Client error ",
            statusCode: 400
        })
    }
}
export const addUserToOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orgId } = req.params;
        const { userId } = req.body
        const result = await addUser(orgId, userId);

        res.status(200).json({
            status: "success",
            message: "User added to organization successfully",
        })
    }
    catch (error) {

        res.status(500).json({
            status: "Bad request",
            message: "Client error ",
            statusCode: 400
        })
    }
}
