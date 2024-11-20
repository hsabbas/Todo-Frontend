export class User {
    public id: number
    public email: string
    public authenticated: boolean

    constructor(id: number, email: string, authenticated: boolean){
        this.id = id;
        this.email = email;
        this.authenticated = authenticated;
    }
}