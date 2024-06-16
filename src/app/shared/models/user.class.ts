export class User {
    constructor(
        public username: string,
        public email: string,
        public role: "ROLE_USER" | "ROLE_ADMIN"
    ) { }
}