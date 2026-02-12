import { Login } from "../contracts/login";
import { Users } from "../contracts/users";

export interface LoginResponse {
    token: string;
    user: Partial<Users>;
}
