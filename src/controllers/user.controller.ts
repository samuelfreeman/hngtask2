import express, { Request, Response, NextFunction } from 'express'

import { userSignToken } from '../utils/token'

import { saveUser, loadUser, } from '../helpers/user.helper'

import { getUserOrg } from '../helpers/org.helper'

import { verfiyPassword } from '../utils/argon'


export const register = async (req: Request, res: Response, next: NextFunction) => { //  regiter a user
    const data = req.body
    try {
        const user = await saveUser(data);


        const accessToken = await userSignToken(user.id)
        const { password, ...withoutPass } = user;
        res.status(201).json({
            status: "success",
            message: "Registration successfull",
            data: {
                accessToken,
                user: withoutPass
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Bad request",
            message: "Registration unsuccessfull!",
            statusCode: 400,
        });
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => { //  login  a user
    try {

        let { password } = req.body;
        const Userpassword = req.user.password;


        const accessToken = await userSignToken(req.user.id)
        const verifyPassword = await verfiyPassword(Userpassword, password)
        if (!verifyPassword) {
            res.status(400).json({
                message: "Invalid credentials"
            })
        } else {


            let { password, ...withoutPass } = req.user;
            res.status(200).json({
                status: "success",
                message: "Login successfull",
                data: {
                    accessToken,
                    user: withoutPass
                }
            })
        }
    } catch (error) {

        res.status(500).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
}

// get a single user's id 

export const singleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await loadUser(id);
        const { password, ...withoutpass } = user
        res.status(200).json({
            status: "success",
            message: "User fetched successfully",
            data: withoutpass
        })
    } catch (error) {

        res.status(500).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401
        });
    }
}


// get a user's organization on his

export const usersOrgs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user.payload
        const organisations = await getUserOrg(id);

        res.status(200).json({
            status: "success",
            message: "User's organization fetched successfully",
            data: {
                organisations
            }
        })
    } catch (error) {

        res.status(500).json({
            status: "Internal Server error",
            message: "Process failed",
            statusCode: 500
        });
    }

}


