export type UserDTO = {
    email: string,
    enabled: boolean,
    id: number,
    name: string,
    role: "ROLE_ADMIN" | "ROLE_USER",
    username: string
}