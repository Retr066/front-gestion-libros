import { User } from "./user.models";

export interface Register {   
    name: string;
    email: string;
    password: string;
    identificationNumber: string;
}


export interface Login {
    email: string;
    password: string;
}

export interface JwtToken {
    token: string;
}


export interface UserLogin extends User , JwtToken {}
