export interface IFormValues {
    [key:string] :string | undefined;
}
export interface IUser {
    username:string;
    displayName:string;
    token:string;
    image?:string
}
export interface IUserFormValues extends IFormValues {
    email:string;
    password:string;
    confirm:string,
    displayName:string;
    username?:string
}