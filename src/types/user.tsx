export interface IUser {
    username: string;
    password: string;
    roleId: string | number;
    id: number;
    cfpassword?: string
}