export interface RegisterBody {
    username: string,
    name: string,
    email: string,
    password: string
}

export interface LoginBody {
    username: string,
    password: string
}