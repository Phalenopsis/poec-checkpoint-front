export class User {
    constructor(
        public name: string,
        public email: string,
        public role: "ROLE_USER" | "ROLE_ADMIN"
    ) { }
}