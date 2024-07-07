import * as argon2 from 'argon2'

export const hashPassword = async (password: string): Promise<string> => {
    const hsdPass = await argon2.hash(password)
    return hsdPass
}

export const verfiyPassword = async ( sysPassword: string,password: string,): Promise<boolean> => {
    const verified = await argon2.verify(sysPassword,password );
    return verified
}





