import prisma from "../utils/prisma"
import { hashPassword } from "../utils/argon"
import CustomError from "../utils/httpCustomError";


//  create user 

export const saveUser = async (data: any) => {
    data.password = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            ...data,
            organisations: {
                create: [
                    {
                        organisation: {
                            create: {
                                name: `${data.firstname}'s Organisation`,
                                description: `This organisation was created by ${data.firstname} ${data.lastname}`
                            }
                        }
                    }
                ]
            }


        }
    })

    return user
}

export const loadUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user
}

export const loadUsers = async () => {
    const user = await prisma.user.findMany({

    })
    return user
}

export const editUser = async (id: string, data: any) => {
    const user = await prisma.user.update({
        where: { id },
        data
    })
    return user
}

export const removeUser = async (id: string) => {
    const user = await prisma.user.delete({
        where: { id }
    })
    return user
}