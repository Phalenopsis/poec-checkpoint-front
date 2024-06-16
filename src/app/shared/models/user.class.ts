export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public role: "ROLE_USER" | "ROLE_ADMIN"
    ) { }
}