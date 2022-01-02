/**
 * User interface for user objects
 */

export interface User {
    first_name: string,
    last_name?: string,
    email: string,
    address?: Address,
    err?: string
}

export interface Address {
    address1: string,
    address2?: string,
    city: string,
    state: string,
    zipcode: number
}

export function createUserObject (userData : any) {
    let newUser : User = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        address: userData.address,
        err: userData.err
    }
    return newUser
}