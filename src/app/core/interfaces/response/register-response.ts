import { Register } from "../contracts/register";

export interface RegisterResponse {
    message: string,
    newUser: Register
}