export interface LoginUser {
    email: string;
    password: string;
};

export interface UserResponseUpdate{
    updatedUser:User;
}
export interface UserResponseDelete{
    deletedUser:User;
}

export interface UserUpdate{
    id?:number;
    name?: string;
    email?: string;
    isActive?: boolean;
    rol?:string;
    password?:string;
}
export interface User {
    id?:number;
    name: string;
    email: string;
    isActive?: boolean;
    rol?:string;
    password?:string;
};
export interface UserResponse{
    status?:any;
    user:User;
    token:string;
}
export interface UserResponseEdit{
    user:User;
}

export interface UserResponseList{
    users:User[];
}
