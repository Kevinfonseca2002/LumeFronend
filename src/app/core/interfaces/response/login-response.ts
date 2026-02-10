import { Login } from "../contracts/login";

export interface LoginResponse {
    token: string;
    user: Login;
}
