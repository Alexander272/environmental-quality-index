export type LoginState = {
    email: string
    password: string
}

export type User = {
    id: string
    email: string
    name: string
    role: string
    token: string
    access?: string[]
}
