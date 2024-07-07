
import prisma from "../utils/prisma";

export const saveOrg = async (userId: string, data: any) => {
    const org = await prisma.organisation.create({
        data: {

            ...data,
            users: {
                create: [
                    {
                        User: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                ]
            }
        }
    })


    return org

}

export const getUserOrg = async (userId: string) => {
    const org = await prisma.organisation.findMany({
        where: {
            users: {
                some: {
                    User: {
                        id: userId
                    }
                }
            }
        },
    })
    return org
}

export const loadSingleOrg = async (orgId: string) => {
    const org = await prisma.organisation.findFirst({
        where: { orgId },

    })
    return org
}

export const addUser = async (orgId: string, userId: string) => {
    const addUserToOrg = await prisma.userOrganisation.create({

        data: {
            organisation: { connect: { orgId: orgId } },
            User: { connect: { id: userId } }
        }
    })

    return addUserToOrg

}

export const editOrg = async (orgId: string, data: any) => {
    const org = await prisma.organisation.update({
        where: { orgId: orgId },
        data
    })
    return org
}

export const removeOrg = async (orgId: string) => {
    const org = await prisma.organisation.delete({
        where: { orgId: orgId }
    })
    return org
}