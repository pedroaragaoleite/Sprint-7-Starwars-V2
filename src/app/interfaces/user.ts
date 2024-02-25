export interface User {
    accessToken?: string,
    user: {
        id?: number,
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
    }
}
